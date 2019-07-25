export default function AppState(state = {}, action) {


    // for updating Component
    if (action.type === "state") {
        state[action.tag] = action.tagValue;
        return state;
    }


    return state;



}