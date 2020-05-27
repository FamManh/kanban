import constants from "./constants";
import api from "../../api/api";
import Errors from "../utils/errors";
import { getHistory } from "../configStore";
const actions = {
    doCreate: (values) => async (dispatch) => {
        try {
            dispatch({ type: constants.COLUMN_CREATE_START });

            // call api
            const res = await api.post(`/task`, values);

            dispatch({
                type: constants.COLUMN_CREATE_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            dispatch({ type: constants.COLUMN_CREATE_ERROR });
            Errors.handle(error);
        }
    },

    doColumnReorder: (data) => ({ type: constants.COLUMN_REORDER, payload: data }),
};

export default actions;
