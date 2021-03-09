const reducer = (state, action) => {
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
        case "SET_ADDRESSES":
            return {
                ...state,
                addresses: action.payload,
            };
        case "SET_ADDRESS":
            return {
                ...state,
                address: action.payload,
            };
        case "SET_SHOPPER_DETAILS":
            return {
                ...state,
                shopperDetails: action.payload,
            };
        case "SET_PAYING":
            return {
                ...state,
                paying: action.payload,
            };
        case "SET_ORDERS":
            return {
                ...state,
                orders: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
