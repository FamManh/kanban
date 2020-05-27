import produce from "immer";
import constants from "./constants";
const initstate = {
    error: null,
};

const boardReducer = (state = initstate, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            
            default:
                break;
        }
    });

export default boardReducer;
