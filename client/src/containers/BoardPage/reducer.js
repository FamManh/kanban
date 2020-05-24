
import produce from 'immer'
import constants from './constants'
const initstate = {
    createLoading: false,
    findLoading: false,
    error: null,
    data: {
        board: null,
        columns: []
    }
}

const boardReducer = (state=initstate, {type, payload})=>
    produce(state, draft=>{
        switch (type) {
            case constants.BOARD_CREATE_START:
                draft.createLoading = true;
                draft.error = null;
                break;
            case constants.BOARD_CREATE_SUCCESS:
                draft.createLoading = false;
                break;
            case constants.BOARD_CREATE_ERROR:
                draft.createLoading = false;
                draft.error = payload || null;
                break;
            case constants.BOARD_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                break;
            case constants.BOARD_FIND_SUCCESS:
                draft.findLoading = false;
                draft.data = payload;
                break;
            case constants.BOARD_FIND_ERROR:
                draft.findLoading = false;
                draft.error = payload;
                break;
            default:
                break;
        }
    })


export default boardReducer;
