export default (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: undefined,
            };
        case "SHOW_MSG":
            return {
                ...state,
                msg: action.payload,
            };
        case "SET_CART":
            return {
                ...state,
                cart: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
