import { createStore, combineReducers } from 'redux';
import ChatViewState from './actions/ChatView/ChatViewState';
import NewComponent from './actions/ChatView/newComponent';
import SetName from './actions/ChatView/SetName';
import SetSessionID from './actions/ChatView/SetSessionID';
import peer from './actions/ChatView/peer';
import LiveVideoObject from './actions/ChatView/LiveVideoObject';
import AppState from './actions/ChatView/AppState';



var reducers  = combineReducers({
    ChatViewState : ChatViewState,
    NewComponent : NewComponent,
    SetName : SetName,
    SetSessionID: SetSessionID,
    peer: peer,
    LiveVideoObject : LiveVideoObject,
    AppState: AppState,
    
})


var store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
    );


export default store;