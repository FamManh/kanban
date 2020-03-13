import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux'
import board from './BoardPage/reducer'

export default history => combineReducers({
    router: connectRouter(history),
    board
})
