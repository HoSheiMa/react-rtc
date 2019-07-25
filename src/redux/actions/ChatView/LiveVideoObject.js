

export default function LiveVideoObject(state = [], action) {


    // for updating Component
    if (action.type === "newVideoObject") {
        state = action.newVideoObject;
        return state;
    }


    return state;



}