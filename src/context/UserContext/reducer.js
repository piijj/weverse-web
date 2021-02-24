export default (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                loading: false,
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
        default:
            return state;
    }
};
