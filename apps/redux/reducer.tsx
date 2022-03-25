import { GET_AUTH } from "./actions";

const initailState = {
    auth: false
}

export const authReducer  = (state = initailState, action: any) => {
    switch (action.type) {
        case GET_AUTH:
            return { ...state, auth: action.payload };
        default:
            return state;
    }
} 