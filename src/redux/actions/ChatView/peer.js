export default function peer(state = [], action) {


    // for updating Component
    if (action.type === "newPeer") {
        state = action.peer;
        return state;
    }


    return state;



}