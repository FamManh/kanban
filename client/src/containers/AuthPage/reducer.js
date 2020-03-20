import constants from "./constants";
import produce from "immer";

const initialState = {
    signupLoading: false,
    signupErrorMessage: null,
    signinLoading: false,
    signinErrorMessage: null
};

const authReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case constants.SIGNUP_START:
                draft.signupLoading = true;
                draft.signupErrorMessage = null;
                break;
            case constants.SIGNUP_SUCCESS:
                draft.signupLoading = false;
                break;
            case constants.SIGNUP_ERROR:
                draft.signupLoading = false;
                draft.signupErrorMessage = payload;
                break;
            case constants.SIGNIN_START:
                draft.signinLoading = true;
                draft.signinErrorMessage = null;
                break;
            case constants.SIGNIN_SUCCESS:
                draft.signinLoading = false;
                break;
            case constants.SIGNIN_ERROR:
                draft.signinLoading = false;
                draft.signinErrorMessage = payload;
                break;
            default:
                return state;
        }
    });

export default authReducer;
