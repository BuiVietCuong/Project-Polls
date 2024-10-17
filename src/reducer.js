import { LOG_OUT } from "./actions";
import { LOG_IN } from "./actions";

const initialState = {
    user: null,
    isLogin: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
            };
        case LOG_OUT:
            return {
                ...state,
                user: null, 
                isLogin: false,
            };
        default:
            return state;
    }
};

export default rootReducer;
