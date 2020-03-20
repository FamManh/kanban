import httpStatus from "http-status";
import { notification, Modal } from "antd";

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

export default class Errors {
    static handle(error) {
        let errorCode = selectErrorCode(error);
        if (errorCode === httpStatus.NOT_FOUND) {
            notification.error(selectErrorMessage(error));
            return;
        }
        if (
            errorCode === httpStatus.CONFLICT ||
            errorCode === httpStatus.UNAUTHORIZED
        ) {
            Modal.error({
                title: selectErrorMessage(error)
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
