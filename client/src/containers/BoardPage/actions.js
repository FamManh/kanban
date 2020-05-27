import constants from './constants'
import columnConstants from "../Column/constants";
import api from '../../api/api'
import Errors from '../utils/errors'
import { getHistory } from '../configStore';
const actions = {
    doCreate: values => async dispatch => {
        try {
            dispatch({ type: constants.BOARD_CREATE_START });

            // call api
            const res = await api.post(`/board`, values);

            dispatch({ type: constants.BOARD_CREATE_SUCCESS, payload: res.data });

            getHistory().push(`/b/${res.data.shortid}`);
        } catch (error) {
            dispatch({ type: constants.BOARD_CREATE_ERROR });
            Errors.handle(error);
        }
        
    },

    doFind: id => async dispatch => {
         try {
             dispatch({ type: constants.BOARD_FIND_START });

             // call api
             const res = await api.get(`/board/${id}`);
        
             dispatch({
                 type: constants.BOARD_FIND_SUCCESS,
                 payload: res.data.board
             });
             
             dispatch({
                 type: columnConstants.COLUMN_FIND_SUCCESS,
                 payload: res.data.columns,
             });

             getHistory().push(`/b/${res.data.board.shortid}`);
         } catch (error) {
             dispatch({ type: constants.BOARD_FIND_ERROR });
             Errors.handle(error);
         }
    },

}

export default actions;
