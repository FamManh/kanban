import httpStatus from "http-status";
import { notification, Modal } from "antd";
import {getHistory} from '../configStore'

const defaultErrorMessage = "Something went wrong";

const selectErrorMessage = error => {
    if (error && error.response && error.response.data) {
        return error.response.data.message;
    }
    return error.message || defaultErrorMessage;
};

const selectErrorCode = error => {
    if (error && error.response) return error.response.status;
    return 500;
};

const login = () =>{
    if(window){
    window.localStorage.removeItem("kauth");
    }
    getHistory().push('/signin')

}

export default class Errors {
    static handle(error) {
        let errorCode = selectErrorCode(error);
        if (errorCode === httpStatus.NOT_FOUND) {
            Modal.error({
                title: selectErrorMessage(error)
            });
            return;
        }
        if (
            errorCode === httpStatus.CONFLICT
        ) {
            Modal.error({
                title: selectErrorMessage(error)
            });
        }
            
        if (errorCode === httpStatus.UNAUTHORIZED){
            Modal.confirm({
                title: selectErrorMessage(error),
                okText: "Login",
                cancelText: "Dismiss",
                onOk: () => login()
            });
        } 
        return;
    }

    static errorCode(error) {
        return selectErrorMessage(error);
    }

    static selectMessage(error) {
        return selectErrorMessage(error);
    }

    static showMessage(error) {
        return Modal.error(selectErrorMessage(error));
    }
}
