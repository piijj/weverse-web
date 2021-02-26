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
        case "SET_ARTIST":
            return {
                ...state,
                artist: action.payload,
                shop: null,
                products: [],
            };
        case "SET_SHOP":
            return {
                ...state,
                shop: action.payload,
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
        case "AUTO_SELECT_ARTIST_AND_SHOP":
            return {
                ...state,
                artist: state.artists[0],
                shop: state.shops[state.artists[0].shopIds[0]],
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
        default:
            return state;
    }
};

export default reducer;
