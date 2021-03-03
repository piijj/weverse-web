const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ARTISTS":
            return {
                ...state,
                artists: action.payload,
            };
        case "SET_SHOPS":
            return {
                ...state,
                shops: action.payload,
            };
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.payload.products,
                categories: action.payload.categories,
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "SET_ARTIST_AND_SHOP":
            return {
                ...state,
                artist: action.payload.artist || state.artists[0],
                shop:
                    action.payload.shop ||
                    state.shops[state.artists[0].shopIds[0]],
                loading: false,
            };

        case "SET_PRODUCT_LOADING":
            return {
                ...state,
                productLoading: true,
            };
        case "SET_PRODUCT":
            return {
                ...state,
                product: action.payload,
                productLoading: false,
            };
        case "SET_CURRENCY":
            return {
                ...state,
                currency: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
