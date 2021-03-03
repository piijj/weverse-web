import React, { useEffect, useContext, createContext, useReducer } from "react";
import reducer from "./reducer";
import firebase from "../../api/firebase";

const initialState = {
    artists: [],
    shops: {},
    categories: [],
    artist: null,
    shop: null,
    products: [],
    loading: true,
    product: null,
    productLoading: true,
    currency: "krw",
};

const DataStateContext = createContext(initialState);
const DataDispatchContext = createContext(undefined);

const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchShops = async () => {
        await firebase
            .firestore()
            .collection("shops")
            .get()
            .then((querySnapshot) => {
                const shops = {};
                querySnapshot.docs.forEach((doc) => {
                    shops[doc.id] = { ...doc.data(), id: doc.id };
                });
                dispatch({ type: "SET_SHOPS", payload: shops });
            });
    };

    const fetchArtists = async () => {
        await firebase
            .firestore()
            .collection("artists")
            .orderBy("name")
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const artists = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    dispatch({ type: "SET_ARTISTS", payload: artists });
                }
            });
    };

    const fetchProducts = async () => {
        await firebase
            .firestore()
            .collection("products")
            .where("artistIds", "array-contains", state.artist.id)
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const products = [];
                    querySnapshot.docs.forEach((doc) => {
                        const data = doc.data();
                        if (data.shopsAvailableIn.includes(state.shop.id)) {
                            products.push({ ...data, id: doc.id });
                        }
                    });
                    const categories = [
                        ...new Set(products.map((product) => product.category)),
                    ];
                    dispatch({
                        type: "SET_PRODUCTS",
                        payload: { products, categories },
                    });
                } else {
                    dispatch({
                        type: "SET_PRODUCTS",
                        payload: { products: [], categories: [] },
                    });
                }
            });
    };

    const fetchProduct = async (id) => {
        !state.productLoading &&
            (await dispatch({ type: "SET_PRODUCT_LOADING", payload: true }));
        await firebase
            .firestore()
            .collection("products")
            .doc(id)
            .get()
            .then((product) => {
                if (product.exists) {
                    dispatch({
                        type: "SET_PRODUCT",
                        payload: { ...product.data(), id: product.id },
                    });
                }
            });
    };

    const handleAddProduct = async (payload) => {
        const values = {
            ...payload,
            description: payload.description.split(", "),
            artistIds: payload.artistIds.map((a) => a.id),
        };
        await firebase
            .firestore()
            .collection("products")
            .add(values)
            .then(() => alert("success"))
            .catch((e) => alert(e.message));
    };

    const loadData = async () => {
        await dispatch({ type: "SET_LOADING", payload: true });
        await fetchShops();
        await fetchArtists();
        await dispatch({ type: "SET_ARTIST_AND_SHOP", payload: {} });
    };

    useEffect(() => {
        if (state.shop && state.artist) {
            fetchProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.shop, state.artist]);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DataStateContext.Provider value={state}>
            <DataDispatchContext.Provider
                value={{
                    dispatch,
                    handleAddProduct,
                    fetchProduct,
                }}
            >
                {children}
            </DataDispatchContext.Provider>
        </DataStateContext.Provider>
    );
};

export const useDataState = () => {
    const dataStateContext = useContext(DataStateContext);
    if (dataStateContext === undefined) {
        throw new Error("dataStateContext must be used within a DataProvider");
    }
    return dataStateContext;
};

export const useDataDispatch = () => {
    const dataDispatchContext = useContext(DataDispatchContext);
    if (dataDispatchContext === undefined) {
        throw new Error(
            "dataDispatchContext must be used within a DataProvider"
        );
    }
    return dataDispatchContext;
};

export default DataProvider;
