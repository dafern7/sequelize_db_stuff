import {ADD_DEVICE} from "../constants/action-types"

const initialState = {
    devices: []
};

function rootReducer(state = initialState, action) {
    if(action.type === ADD_DEVICE) {
        return Object.assign({}, state , {devices: state.devices.concat(action.payload)}); //keeps original state unaltered
    };
    return state
}

export default rootReducer