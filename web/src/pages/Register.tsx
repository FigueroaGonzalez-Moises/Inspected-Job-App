import React from "react";
import { useRegisterMutation } from "../generated/graphql";
import { UserDataInputs } from "./Home";

const Register = ({ props }: any) => {
    let {
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
    } = props;

    const [register] = useRegisterMutation();

    return (
        <>
            <h1>Sign Up</h1>
            <h5
                style={{
                    textAlign: "center",
                    color: "blue",
                }}
                onClick={() => {}}
            >
                <span
                    className="noselect"
                    onClick={() => {
                        setRegister(false);
                    }}
                >
                    Or Log In
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
                    <div
                        className="input-box"
                        style={{
                            width: "85%",
                            marginLeft: "5%",
                        }}
                    >
                        <input
                            onClick={() => {
                                try {
                                    document.getElementById(
                                        "age-label"
                                    )!.style.transform = "translateY(0)";
                                } catch {}
                            }}
                            onFocus={() => {
                                try {
                                    document.getElementById(
                                        "age-label"
                                    )!.style.transform = "translateY(0)";
                                } catch {}
                            }}
                            onBlur={() => {
                                if (!age) {
                                    document.getElementById(
                                        "age-label"
                                    )!.style.transform = "";
                                }
                            }}
                            value={age}
                            onChange={e => setAge(e.target.value)}
                        />
                        <label id="age-label">Age (Optional)</label>
                    </div>
                    <div
                        className="input-box"
                        style={{
                            width: "85%",
                            marginLeft: "5%",
                        }}
                    >
                        <input
                            id="pn-input"
                            onClick={() => {
                                try {
                                    document.getElementById(
                                        "pn-label"
                                    )!.style.transform = "translateY(0)";
                                } catch {}
                            }}
                            onFocus={() => {
                                try {
                                    document.getElementById(
                                        "pn-label"
                                    )!.style.transform = "translateY(0)";
                                } catch {}
                            }}
                            onBlur={() => {
                                if (!phone_number) {
                                    document.getElementById(
                                        "pn-label"
                                    )!.style.transform = "";
                                }
                            }}
                            value={phone_number}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                        <label id="pn-label">Phone Number</label>
                    </div>
                </div>
            </div>
            <span
                className="center"
                style={{ color: "red" }}
                id="error-zone"
            ></span>
            <div className="center">
                <button
                    className="login-btn"
                    onClick={async e => {
                        e.preventDefault();

                        resetInputs(["fn", "ln", "p", "pn"]);

                        if (
                            !runInputValdation({
                                first_name,
                                last_name,
                                password,
                                phone_number,
                            })
                        ) {
                            return;
                        }

                        let res = await register({
                            variables: {
                                age,
                                first_name,
                                last_name,
                                password,
                                phone_number,
                            },
                        });

                        if (res.data!.register.successful) {
                            window.location.reload();
                        } else {
                            try {
                                document.getElementById(
                                    "error-zone"
                                )!.innerHTML = res.data!.register.error || "";
                            } catch {}
                        }
                    }}
                >
                    Sign Up
                </button>
            </div>
        </>
    );
};

const resetInputs = (arr: string[]) => {
    for (let i = 0; i < arr.length; i++) {
        try {
            document.getElementById(`${arr[i]}-label`)!.style.color = "black";

            document.getElementById(`${arr[i]}-input`)!.style.borderBottom =
                "1px solid black";
        } catch {}
    }
};

const runInputValdation = (props: any) => {
    let { first_name, last_name, password, phone_number } = props;
    if (!first_name || !last_name || !password || !phone_number) {
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

        if (!phone_number) {
            try {
                document.getElementById("pn-label")!.style.color = "red";

                document.getElementById("pn-input")!.style.borderBottom =
                    "1px solid red";
            } catch {}
        }

        document.getElementById("error-zone")!.innerHTML =
            "Please fill in the following fields";
        return false;
    }

    return true;
};

export default Register;
