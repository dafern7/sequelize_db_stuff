import {ADD_DEVICE} from "../constants/action-types"

export function addDevice(payload) {
    return{type: ADD_DEVICE, payload }
};