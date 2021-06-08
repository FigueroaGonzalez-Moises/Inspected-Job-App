import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Field,
    Int,
    UseMiddleware,
    // UseMiddleware,
} from "type-graphql";
import { compare, hash } from "bcryptjs";
import { User } from "./entities/User";
// import { MyContext } from "./MyContext";
import { createRefreshToken, createAccessToken } from "./auth";
import { isAuth } from "./isAuth";
// import { verify } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
    @Field({ nullable: true })
    accessToken?: string;
    @Field({ nullable: true })
    refreshToken?: string;
}

@ObjectType()
class RegisterResponse {
    @Field()
    successful?: boolean;

    @Field({ nullable: true })
    error?: string;
}

@ObjectType()
class getUsersResponse {
    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field(() => Int)
    id: number;

    @Field()
    age: string;

    @Field()
    phone_number: string;
}

@Resolver()
export class UserResolver {
    @Query(() => [getUsersResponse])
    async users() {
        return await User.query("SELECT * FROM users");
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("first_name") first_name: string,
        @Arg("last_name") last_name: string,
        @Arg("password") password: string
    ): Promise<LoginResponse> {
        try {
            if (!first_name || !last_name) {
                return {};
            }

            const user = await User.query(
                `SELECT * FROM users WHERE LOWER("first_name") = LOWER('${first_name}') AND LOWER("last_name") = LOWER('${last_name}')`
            );

            if (user.length === 0) {
                return { accessToken: "", refreshToken: "" };
            }

            const valid = await compare(password, user[0].password);

            if (!valid) {
                return { accessToken: "", refreshToken: "" };
            }

            return {
                accessToken: createAccessToken(user[0]),
                refreshToken: createRefreshToken(user[0]),
            };
        } catch (e) {
            console.log(`Could not login error => `, e);
            return {};
        }
    }

    @Mutation(() => RegisterResponse)
    async register(
        @Arg("first_name") first_name: string,
        @Arg("last_name") last_name: string,
        @Arg("password") password: string,
        @Arg("age") age: string,
        @Arg("phone_number") phone_number: string
    ) {
        if (!first_name || !last_name || !password || !phone_number) {
            return { successful: false, error: "Missing fields" };
        }

        const user = await User.query(
            `SELECT * FROM users WHERE LOWER("first_name") = LOWER($1) AND LOWER("last_name") = LOWER($2)`,
            [first_name, last_name]
        );

        if (user.length > 0) {
            return {
                successful: false,
                error: "User already exist",
            };
        } else {
            try {
                const hashedPassword = await hash(password, 12);

                await User.insert({
                    first_name,
                    last_name,
                    password: hashedPassword,
                    age,
                    phone_number,
                });

                return { successful: true };
            } catch (error) {
                return { successful: false, error };
            }
        }
        // inset user
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async editAccount(
        @Arg("userId") userId: number,
        @Arg("first_name") first_name: string,
        @Arg("last_name") last_name: string,
        @Arg("password") password: string,
        @Arg("age") age: string,
        @Arg("phone_number") phone_number: string
    ) {
        try {
            let user = await User.findOneOrFail({ id: userId });
            let hashedPassword = "";
            if (!!password) {
                hashedPassword = await hash(password, 12);
            }
            let result = User.merge(user, {
                first_name: first_name || user.first_name,
                last_name: last_name || user.last_name,
                password: hashedPassword || user.password,
                age: age || user.age,
                phone_number: phone_number || user.phone_number,
            });

            await User.save(result);
        } catch {
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteUser(@Arg("userId") userId: number) {
        try {
            User.delete({ id: userId });
        } catch {
            return false;
        }
        return true;
    }
}
