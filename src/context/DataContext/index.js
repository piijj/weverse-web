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
            .get()
            .then((querySnapshot) => {
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
        await dispatch({ type: "AUTO_SELECT_ARTIST_AND_SHOP" });
    };

    const handleSelectArtist = (artist) => {
        dispatch({ type: "SET_ARTIST", payload: artist });
    };

    const handleSelectShop = (shop) => {
        dispatch({ type: "SET_SHOP", payload: shop });
    };

    useEffect(() => {
        if (state.shop && state.artist) {
            fetchProducts();
        }
    }, [state.shop, state.artist]);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <DataStateContext.Provider value={state}>
            <DataDispatchContext.Provider
                value={{
                    dispatch,
                    handleSelectArtist,
                    handleSelectShop,
                    handleAddProduct,
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
