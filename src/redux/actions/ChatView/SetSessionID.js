export default function SetSessionID(state = "", action) {

    if (action.type === "setSessionID") {
        
        state = action.ID;
        return state;
    }

    return state;
}