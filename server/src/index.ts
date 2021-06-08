import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection, getConnectionOptions } from "typeorm";
import { verify } from "jsonwebtoken";
import cors from "cors";
import { User } from "./entities/User";
import { createAccessToken, createRefreshToken } from "./auth";

(async () => {
    const app = express();
    if (process.env.NODE_ENV === "production") {
        app.use(
            cors({
                origin: "https://figueroagonzalez-moises.github.io",
                credentials: true,
            })
        );
    } else {
        app.use(
            cors({
                origin: "http://localhost:3000",
                credentials: true,
            })
        );
    }

    app.get("/", (_req, res) => res.send("hello"));

    app.post("/refresh_token", async (req, res) => {
        const token = req.headers.refreshtoken as string;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload: any = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }

        const user = await User.findOne({ id: payload.userId });

        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }

        return res.send({
            accessToken: createAccessToken(user),
            refreshToken: createRefreshToken(user),
        });
    });

    if (process.env.NODE_ENV === "production") {
        const connectionOptions = await getConnectionOptions(
            process.env.NODE_ENV
        );

        try {
            await createConnection({
                ...connectionOptions,
                type: "postgres",
                url: process.env.DATABASE_URL,
                entities: [__dirname + "/entities/**/*.js"],
                name: "default",
                ssl: {
                    rejectUnauthorized: false,
                },
            } as any);
        } catch (error) {
            console.log("Could not connect to Database Error :>> ", error);
        }
    } else {
        await createConnection();
    }

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    let PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Express server listening on ${PORT}`);
    });
})();
