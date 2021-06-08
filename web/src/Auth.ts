import jwtDecode from "jwt-decode";
import { getAccessToken } from "./accessToken";

export const checkIfAuth = () => {
    const token = getAccessToken();

    if (!token) {
        return false;
    }

    try {
        const { exp } = jwtDecode(token) as any;
        if (Date.now() >= exp * 1000) {
            return false;
        } else {
            return true;
        }
    } catch {
        return false;
    }
};
