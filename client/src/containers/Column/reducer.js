import produce from "immer";
import constants from "./constants";
const initstate = {
    createLoading: false,
    error: null,
    columns: []
};

const boardReducer = (state = initstate, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case constants.COLUMN_CREATE_START:
                draft.createLoading = true;
                draft.error = null;
                break;
            case constants.COLUMN_CREATE_SUCCESS:
                state.columns.forEach((item, index) => {
                    // tìm id index column hiện tại và đẩy task mới tạo vào cuối mảng
                    if (item.shortid === payload.columnId) {
                        draft.columns[index].tasks.push(payload);
                    }
                });
                draft.createLoading = false;
                break;
            case constants.COLUMN_CREATE_ERROR:
                draft.createLoading = false;
                draft.error = payload || null;
                break;
            case constants.COLUMN_FIND_SUCCESS:
                draft.columns = payload;
                break;
            case constants.COLUMN_REORDER:
                draft.columns = payload;
                break;
            default:
                break;
        }
    });

export default boardReducer;
