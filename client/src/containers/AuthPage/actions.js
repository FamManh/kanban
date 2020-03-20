import api from "../../api/api";
import constants from "./constants";
import { getHistory } from "../configStore";
import Errors from "../utils/errors";

const actions = {
    doSignup: values => async dispatch => {
        try {
            dispatch({ type: constants.SIGNUP_START });

            // call api
            const res = await api.post(`/auth/register`, values);
            window.localStorage.setItem("kauth", JSON.stringify(res.data));

            dispatch({ type: constants.SIGNUP_SUCCESS });
            getHistory().push("/");
        } catch (error) {
            const errorMessage = Errors.selectMessage(error);
            dispatch({ type: constants.SIGNUP_ERROR, payload: errorMessage });
        }
    },
    doSignin: values => async dispatch => {
        try {
            dispatch({ type: constants.SIGNIN_START });

            // call api
            const res = await api.post(`/auth/login`, values);
            window.localStorage.setItem("kauth", JSON.stringify(res.data));

            dispatch({ type: constants.SIGNIN_SUCCESS });
            getHistory().push("/");
        } catch (error) {
            const errorMessage = Errors.selectMessage(error);
            dispatch({ type: constants.SIGNIN_ERROR, payload: errorMessage });
        }
    },
    doSignout: () => {
        window.localStorage.removeItem("kauth");
        getHistory().push("/signin");
    }
};

export default actions;
