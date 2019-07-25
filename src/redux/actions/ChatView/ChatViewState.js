export default function ChatViewState(state = [], action) {


    // for updating state array

    if (action.type === "newState") {
        state = action.newState;
    }

    if (action.type === "AddNewStateMessage") {
        state.push(action.Message);
        return state;
        
    }


    return state;



}
