export default function SetName(state = "Unknow", action) {

    if (action.type === "setName") {
        
        state = action.name;
        return state;
    }

    return state;
}