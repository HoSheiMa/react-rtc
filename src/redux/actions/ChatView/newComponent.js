export default function NewComponent(state = [], action) {


    // for updating Component
    if (action.type === "newComponent") {
        state = action.newComponent;
        return state;
    }


    return state;



}