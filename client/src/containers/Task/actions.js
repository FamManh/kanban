import constants from "./constants";
import columnConstants from "../Column/constants";
import api from "../../api/api";
import Errors from "../utils/errors";
import { getHistory } from "../configStore";
const actions = {
    doReorder: async (data) => {
        const res = await api.post(`/task/${data.taskId}/merge`, data);
    },
    doSelectTask: (data) => ({ type: constants.TASK_ON_SELECT, payload: data }),
    doFind: (id) => async (dispatch) => {
        try {
            dispatch({ type: constants.TASK_FIND_START });

            // call api
            const res = await api.get(`/task/${id}`);

            dispatch({
                type: constants.TASK_FIND_SUCCESS,
                payload: res.data.task,
            });
        } catch (error) {
            dispatch({ type: constants.TASK_FIND_ERROR });
            Errors.handle(error);
        }
    },

    doUpdate: (data, id) => async (dispatch) => {
        try {
            dispatch({ type: constants.TASK_UPDATE_START });

            // call api
            const res = await api.put(`/task/${id}`, data);

            dispatch({
                type: constants.TASK_UPDATE_SUCCESS,
                payload: res.data,
            });
            dispatch({
                type: columnConstants.COLUMN_TASK_UPDATE_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            dispatch({ type: constants.TASK_UPDATE_ERROR });
            Errors.handle(error);
        }
    },
};

export default actions;
