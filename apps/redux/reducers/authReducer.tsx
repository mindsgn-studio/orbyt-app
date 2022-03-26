import { GET_AUTH, NEW_USER, IS_LOADING } from "../../constants";

const initailState = {
    auth: false,
    newUser: true,
    wallet: [],
    loading: false
}

export const authReducer  = (state = initailState, action: any) => {
    switch (action.type) {
        case GET_AUTH:
            return { ...state, auth: action.payload };
        case NEW_USER:
            return { ...state, newUser: action.payload };
        case IS_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};