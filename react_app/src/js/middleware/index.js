import {ADD_DEVICE} from "../constants/action-types"
import List from "../components/list"
const device_list = ["Device 1","Device 2"]

export function duplicateDevice({ dispatch }) {
    return function(next) {
        return function(action) {
            if (action.type === ADD_DEVICE) {
                const duplicate = device_list.filter(duplicate_device =>
                    action.payload.device_name.includes(duplicate_device));

                if (duplicate.length) {
                    return dispatch ({ type: "Duplicate!" })
                }
            }
            return next(action); 
        };
    };
}
