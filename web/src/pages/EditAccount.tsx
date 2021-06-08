import jwtDecode from "jwt-decode";
import React from "react";
import { getAccessToken, setAccessToken } from "../accessToken";
import { useEditAccountMutation } from "../generated/graphql";
import { UserDataInputs } from "./Home";

const EditAccount = ({ props }: any) => {
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
    } = props;

    const [editAccount] = useEditAccountMutation();

    const logout = () => {
        try {
            setAccessToken(" ");
            localStorage.removeItem("urd");
            window.location.reload();
        } catch {}
    };

    return (
        <>
            <h1 style={{ marginBottom: "15px" }}>
                Edit your account
                <i
                    style={{ marginLeft: "20px" }}
                    className="fa fa-sign-out"
                    aria-hidden="true"
                    onClick={() => logout()}
                ></i>
            </h1>

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
                        <label id="age-label">Age</label>
                    </div>
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
            <div className="center">
                <button
                    className="login-btn"
                    onClick={async () => {
                        const token = getAccessToken();
                        let userId;
                        if (!!token) {
                            let tmp = jwtDecode(token) as any;
                            userId = tmp.userId;
                        }

                        await editAccount({
                            variables: {
                                age,
                                first_name,
                                last_name,
                                password,
                                phone_number,
                                userId,
                            },
                        });

                        window.location.reload();
                    }}
                >
                    SUBMIT
                </button>
            </div>
        </>
    );
};

export default EditAccount;
