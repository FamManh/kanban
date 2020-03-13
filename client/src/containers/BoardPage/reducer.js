import * as constant from './constant'
import produce from 'immer'
const initstate = {
    name: 'Manh',
    count: 0
}

const boardReducer = (state=initstate, {type, payload})=>
    produce(state, draft=>{
        switch(type){
            case constant.BOARD_CREATE:
                draft.name = payload;
                draft.count = state.count + 1
                break;
            default:
                break;
        }
    })


export default boardReducer;
