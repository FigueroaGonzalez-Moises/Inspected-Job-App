import React, { useEffect, useState } from "react";
import {
    useDeleteUserMutation,
    useLoginMutation,
    useUsersQuery,
} from "../generated/graphql";
import "../css/main.css";
import { getAccessToken, setAccessToken } from "../accessToken";
import { checkIfAuth } from "../Auth";
import jwtDecode from "jwt-decode";
import EditAccount from "./EditAccount";
import Register from "./Register";
interface Props {}

export const Home: React.FC<Props> = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const { data, loading } = useUsersQuery();
    const [registerState, setRegister] = useState(false);
    const [age, setAge] = useState("");
    const [phone_number, setPhoneNumber] = useState("");

    const [LOGIN] = useLoginMutation();
    const [DELETE_USER] = useDeleteUserMutation();

    useEffect(() => {
        if (first_name) {
            try {
                document.getElementById("fn-label")!.style.transform =
                    "translateY(0)";
            } catch {}
        }
        if (last_name) {
            try {
                document.getElementById("ln-label")!.style.transform =
                    "translateY(0)";
            } catch {}
        }
        if (age) {
            try {
                document.getElementById("age-label")!.style.transform =
                    "translateY(0)";
            } catch {}
        }
        if (phone_number) {
            try {
                document.getElementById("pn-label")!.style.transform =
                    "translateY(0)";
            } catch {}
        }
    });

    const login = async () => {
        if (!first_name || !last_name || !password) {
            document.getElementById(`fn-label`)!.style.color = "black";

            document.getElementById(`fn-input`)!.style.borderBottom =
                "1px solid black";

            document.getElementById(`ln-label`)!.style.color = "black";

            document.getElementById(`ln-input`)!.style.borderBottom =
                "1px solid black";
            document.getElementById(`p-label`)!.style.color = "black";

            document.getElementById(`p-input`)!.style.borderBottom =
                "1px solid black";

            if (!first_name) {
                try {
                    document.getElementById("fn-label")!.style.color = "red";

                    document.getElementById("fn-input")!.style.borderBottom =
                        "1px solid red";
                } catch {}
            }
            if (!last_name) {
                try {
                    document.getElementById("ln-label")!.style.color = "red";

                    document.getElementById("ln-input")!.style.borderBottom =
                        "1px solid red";
                } catch {}
            }

            if (!password) {
                try {
                    document.getElementById("p-label")!.style.color = "red";

                    document.getElementById("p-input")!.style.borderBottom =
                        "1px solid red";
                } catch {}
            }
        } else {
            const response = await LOGIN({
                variables: {
                    first_name,
                    last_name,
                    password,
                },
            });

            if (response && response.data) {
                setAccessToken(response.data.login.accessToken || "");
                localStorage.setItem(
                    "urd",
                    response.data.login.refreshToken || ""
                );
                window.location.reload();
            }
        }
    };

    return (
        <div className="pageWrapper">
            <div className="verticle-align">
                <div className="horizontal-align">
                    <div className="contentWrapper">
                        <div className="left">
                            <div className="text">
                                <h1>Users :</h1>

                                <ul>
                                    {!!data
                                        ? data.users.map((val, i) => {
                                              const token = getAccessToken();
                                              let userId;
                                              if (!!token) {
                                                  let tmp = jwtDecode(
                                                      token
                                                  ) as any;
                                                  userId = tmp.userId;
                                              }

                                              if (
                                                  checkIfAuth() &&
                                                  data.users[i].id === userId
                                              ) {
                                                  if (
                                                      first_name === "" &&
                                                      last_name === ""
                                                  ) {
                                                      setFirstName(
                                                          data.users[i]
                                                              .first_name
                                                      );
                                                      setLastName(
                                                          data.users[i]
                                                              .last_name
                                                      );

                                                      setAge(data.users[i].age);
                                                      setPhoneNumber(
                                                          data.users[i]
                                                              .phone_number
                                                      );
                                                  }

                                                  return (
                                                      <li key={i}>
                                                          * {val.first_name},{" "}
                                                          {val.last_name}
                                                          <>
                                                              {checkIfAuth() ? (
                                                                  <i
                                                                      style={{
                                                                          marginLeft:
                                                                              "10px",
                                                                          color: "#ff2929",
                                                                      }}
                                                                      onClick={() => {
                                                                          DELETE_USER(
                                                                              {
                                                                                  variables:
                                                                                      {
                                                                                          userId: data
                                                                                              .users[
                                                                                              i
                                                                                          ]
                                                                                              .id,
                                                                                      },
                                                                              }
                                                                          );
                                                                          window.location.reload();
                                                                      }}
                                                                      className="fa fa-trash"
                                                                      aria-hidden="true"
                                                                  ></i>
                                                              ) : null}
                                                          </>
                                                      </li>
                                                  );
                                              } else {
                                                  return (
                                                      <li key={i}>
                                                          {val.first_name},{" "}
                                                          {val.last_name}
                                                          <>
                                                              {checkIfAuth() ? (
                                                                  <i
                                                                      style={{
                                                                          marginLeft:
                                                                              "10px",
                                                                          color: "#ff2929",
                                                                      }}
                                                                      onClick={() => {
                                                                          DELETE_USER(
                                                                              {
                                                                                  variables:
                                                                                      {
                                                                                          userId: data
                                                                                              .users[
                                                                                              i
                                                                                          ]
                                                                                              .id,
                                                                                      },
                                                                              }
                                                                          );

                                                                          window.location.reload();
                                                                      }}
                                                                      className="fa fa-trash"
                                                                      aria-hidden="true"
                                                                  ></i>
                                                              ) : null}
                                                          </>
                                                      </li>
                                                  );
                                              }
                                          })
                                        : null}
                                </ul>
                            </div>
                        </div>
                        <div className="right">
                            <div className="login-box">
                                {checkIfAuth() ? (
                                    <EditAccount
                                        props={{
                                            first_name,
                                            setFirstName,
                                            last_name,
                                            setLastName,
                                            password,
                                            setPassword,
                                            age,
                                            setAge,
                                            phone_number,
                                            setPhoneNumber,
                                        }}
                                    />
                                ) : (
                                    <>
                                        {!registerState ? (
                                            <>
                                                <h1>Log In</h1>
                                                <h5
                                                    style={{
                                                        textAlign: "center",
                                                        color: "blue",
                                                    }}
                                                >
                                                    <span
                                                        className="noselect"
                                                        onClick={() => {
                                                            setRegister(true);
                                                        }}
                                                    >
                                                        Sign Up
                                                    </span>
                                                </h5>
                                                <div className="center">
                                                    <div className="container">
                                                        <UserDataInputs
                                                            props={{
                                                                first_name,
                                                                setFirstName,
                                                                last_name,
                                                                setLastName,
                                                                password,
                                                                setPassword,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="center">
                                                    <button
                                                        className="login-btn"
                                                        onClick={() => login()}
                                                    >
                                                        LOG IN
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Register
                                                    props={{
                                                        first_name,
                                                        setFirstName,
                                                        last_name,
                                                        setLastName,
                                                        password,
                                                        setPassword,
                                                        age,
                                                        setAge,
                                                        phone_number,
                                                        setPhoneNumber,
                                                        setRegister,
                                                    }}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const UserDataInputs = ({ props }: any) => {
    let {
        first_name,
        setFirstName,
        last_name,
        setLastName,
        password,
        setPassword,
    } = props;

    return (
        <>
            <div
                className="input-box"
                style={{
                    marginLeft: "5%",
                    width: "40%",
                    display: "inline-block",
                }}
            >
                <input
                    id="fn-input"
                    onClick={() => {
                        try {
                            document.getElementById(
                                "fn-label"
                            )!.style.transform = "translateY(0)";
                        } catch {}
                    }}
                    onFocus={() => {
                        try {
                            document.getElementById(
                                "fn-label"
                            )!.style.transform = "translateY(0)";
                        } catch {}
                    }}
                    onBlur={() => {
                        if (!first_name) {
                            document.getElementById(
                                "fn-label"
                            )!.style.transform = "";
                        }
                    }}
                    value={first_name}
                    onChange={e => setFirstName(e.target.value)}
                />
                <label id="fn-label">First Name</label>
            </div>

            <div
                className="input-box"
                style={{
                    marginLeft: "5%",
                    width: "40%",
                    display: "inline-block",
                }}
            >
                <input
                    id="ln-input"
                    onClick={() => {
                        try {
                            document.getElementById(
                                "ln-label"
                            )!.style.transform = "translateY(0)";
                        } catch {}
                    }}
                    onFocus={() => {
                        try {
                            document.getElementById(
                                "ln-label"
                            )!.style.transform = "translateY(0)";
                        } catch {}
                    }}
                    onBlur={() => {
                        if (!last_name) {
                            document.getElementById(
                                "ln-label"
                            )!.style.transform = "";
                        }
                    }}
                    value={last_name}
                    onChange={e => setLastName(e.target.value)}
                />
                <label id="ln-label">Last Name</label>
            </div>

            <div
                className="input-box"
                style={{
                    width: "85%",
                    marginLeft: "5%",
                }}
            >
                <input
                    id="p-input"
                    onClick={() => {
                        try {
                            document.getElementById(
                                "p-label"
                            )!.style.transform = "translateY(0)";
                        } catch {}
                    }}
                    onFocus={() => {
                        try {
                            document.getElementById(
                                "p-label"
                            )!.style.transform = "translateY(0)";
                        } catch {}
                    }}
                    onBlur={() => {
                        if (!password) {
                            document.getElementById(
                                "p-label"
                            )!.style.transform = "";
                        }
                    }}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
                <label id="p-label">Password</label>
            </div>
        </>
    );
};
