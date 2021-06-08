import React, { useState, useEffect } from "react";
import { setAccessToken } from "./accessToken";
import { Home } from "./pages/Home";
import "./css/main.css";

interface Props {}

export const App: React.FC<Props> = () => {
    const [loading, setLoading] = useState(true);

    var URI = "";
    if (process.env.NODE_ENV === "production") {
        URI = "https://inspected-job-app-server.herokuapp.com";
    } else {
        URI = "http://localhost:4000";
    }

    useEffect(() => {
        let refreshToken = localStorage.getItem("urd") || "";
        fetch(`${URI}/refresh_token`, {
            method: "POST",
            credentials: "include",
            headers: {
                refreshToken: refreshToken || "",
            },
        }).then(async res => {
            const { accessToken, refreshToken } = await res.json();
            setAccessToken(accessToken);
            localStorage.setItem("urd", refreshToken || "");
            setLoading(false);
        });
    });

    if (loading) {
        return (
            <div className="pageWrapper" style={{ backgroundColor: "#333" }}>
                <div className="cssload-dots">
                    <div className="cssload-dot"></div>
                    <div className="cssload-dot"></div>
                    <div className="cssload-dot"></div>
                    <div className="cssload-dot"></div>
                    <div className="cssload-dot"></div>
                </div>

                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur
                                in="SourceGraphic"
                                result="blur"
                                stdDeviation="12"
                            ></feGaussianBlur>
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7"
                                result="goo"
                            ></feColorMatrix>
                        </filter>
                    </defs>
                </svg>
            </div>
        );
    }

    return <Home />;
};
