import { USER_VERIFICATION_URI } from "../utils/endpoints.js";
import {
    getToken,
    removeUserSession,
    setUserSession,
} from "../utils/session.js";

export const verifyUser = async () => {
    const token = getToken();
    if (!token) return false;

    const verified = await axios
        .get(USER_VERIFICATION_URI + token)
        .then((res) => {
            setUserSession(res.data.token, res.data.user);
            return true;
        })
        .catch((err) => {
            removeUserSession();
            return false;
        });
    if (verified) return true;
    else return false;
};
