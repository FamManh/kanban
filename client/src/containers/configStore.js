import {createStore, applyMiddleware} from 'redux';
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducer'
import thunkMiddle from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'

const history = createBrowserHistory();
let store;
export function configStore(preloadState){
    const middleware = [thunkMiddle, routerMiddleware(history)].filter(Boolean);
    store = createStore(
        createRootReducer(history),
        preloadState,
        composeWithDevTools(applyMiddleware(...middleware))
    )
    return store;
}

export function getHistory(){
    return history
}
export default function getStore(){
    return store
};
