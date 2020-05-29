import produce from "immer";
import constants from "./constants";
const initstate = {
    taskId: null, 
    error: null,
    findLoading: false,
    updateLoading: false,
    task: null
};

const boardReducer = (state = initstate, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case constants.TASK_ON_SELECT:
                draft.taskId = payload;
                break;
            case constants.TASK_FIND_START:
                draft.findLoading = true;
                break;
            case constants.TASK_FIND_SUCCESS:
                draft.task = payload;
                draft.findLoading = false;
                break;
            case constants.TASK_FIND_ERROR:
                draft.findLoading = false;
                draft.taskId = null;
                draft.task = null;
                break;
            case constants.TASK_UPDATE_START:
                draft.updateLoading = true;
                break;
            case constants.TASK_UPDATE_SUCCESS:
                draft.task = payload;
                draft.updateLoading = false;
                break;
            case constants.TASK_UPDATE_ERROR:
                draft.updateLoading = false;
                break;

            default:
                break;
        }
    });

export default boardReducer;
