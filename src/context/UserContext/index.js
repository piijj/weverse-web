import React, { useEffect, useContext, createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import reducer from "./reducer";
import firebase, { facebook, twitter, google } from "../../api/firebase";
import { groupCartOrdersByShippingDate, generateOrderId } from "../../utils";
import moment from "moment";

const initialState = {
    user: {},
    loading: true,
    msg: undefined,
    cart: [],
    addresses: [],
    address: undefined,
    shopperDetails: undefined,
    paying: false,
    orders: [],
};

const UserStateContext = createContext(initialState);
const UserDispatchContext = createContext(undefined);

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const showMessage = (err, type) => {
        dispatch({ type: "SHOW_MSG", payload: { msg: err, type } });
        setTimeout(() => dispatch({ type: "SHOW_MSG", payload: null }), 3000);
    };

    const addUserToCollection = async (uid, payload) => {
        await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .set(payload)
            .then(() => console.log("success"))
            .catch((error) => showMessage(error.message, "error"));
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                await getUser(user);
                await getUserCart(user);
                await getUserAddresses(user);
                await getUserOrders(user);
            } else {
                dispatch({ type: "SET_USER", payload: undefined });
                history.push("/login");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const userRegister = async (values) => {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(async (credential) => {
                if (credential) {
                    const payload = {
                        email: values.email,
                        country: values.country,
                        firstName: values.firstName,
                        lastName: values.lastName,
                    };
                    await addUserToCollection(credential.user.uid, payload);
                }
            })
            .catch((error) => {
                showMessage(error.message, "error");
            });
    };

    //to refactor
    const resendEmailVerification = async () => {
        await firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(() => {
                showMessage("Verification email sent.", "success");
                userLogout();
            })
            .catch((error) => showMessage(error.message, "error"));
    };

    const userLogin = (email, password, isSubmitting) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((credential) => {
                isSubmitting(false);
                if (!credential.user.emailVerified) {
                    showMessage(
                        "Please verify your account before logging in.",
                        "error"
                    );
                }
            })
            .catch((error) => {
                showMessage(error.message, "error");
                isSubmitting(false);
            });
    };

    const userLoginWithSocialMedia = (type) => {
        firebase
            .auth()
            .signInWithPopup(
                type === "google"
                    ? google
                    : type === "facebook"
                    ? facebook
                    : twitter
            )
            .then(async (newUser) => {
                await firebase
                    .firestore()
                    .collection("users")
                    .doc(newUser.user.uid)
                    .get()
                    .then(async (user) => {
                        if (!user.exists) {
                            const payload = {
                                email: newUser.additionalUserInfo.profile.email,
                                country: "",
                                firstName:
                                    newUser.additionalUserInfo.profile
                                        .given_name,
                                lastName:
                                    newUser.additionalUserInfo.profile
                                        .family_name,
                            };
                            await addUserToCollection(
                                newUser.user.uid,
                                payload
                            );
                        }
                    });
            })
            .catch((error) => showMessage(error.message, "error"));
    };

    const userLogout = async () => {
        firebase.auth().signOut();
    };

    const getUser = (user) => {
        firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .onSnapshot((currentUser) => {
                if (currentUser.exists) {
                    dispatch({
                        type: "SET_USER",
                        payload: {
                            ...currentUser.data(),
                            emailVerified: user.emailVerified,
                            id: currentUser.id,
                        },
                    });
                }
            });
    };

    const getUserCart = (user) => {
        firebase
            .firestore()
            .collection("cartItems")
            .where("userId", "==", user.uid)
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const cart = [];
                    querySnapshot.docs.forEach(async (doc, index) => {
                        const data = doc.data();
                        if (!data.ordered) {
                            await firebase
                                .firestore()
                                .collection("products")
                                .doc(data.productId)
                                .get()
                                .then((product) => {
                                    cart.push({
                                        product: {
                                            ...product.data(),
                                            id: product.id,
                                        },
                                        ...data,
                                        id: doc.id,
                                    });
                                    if (index === querySnapshot.size - 1) {
                                        dispatch({
                                            type: "SET_CART",
                                            payload: cart,
                                        });
                                    }
                                });
                        } else if (index === querySnapshot.size - 1) {
                            dispatch({
                                type: "SET_CART",
                                payload: [],
                            });
                        }
                    });
                }
            });
    };

    const getUserAddresses = (user) => {
        firebase
            .firestore()
            .collection("addresses")
            .where("userId", "==", user.uid)
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const addresses = [];
                    querySnapshot.docs.forEach((doc) => {
                        addresses.push({ ...doc.data(), id: doc.id });
                    });
                    dispatch({ type: "SET_ADDRESSES", payload: addresses });
                }
            });
    };

    const getUserOrders = (user) => {
        firebase
            .firestore()
            .collection("orders")
            .where("shippingAddress.userId", "==", user.uid)
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const products = [];
                    querySnapshot.docs.forEach((doc, index) => {
                        const data = { ...doc.data(), id: doc.id };
                        const items = [];
                        data.items.forEach(async (item, i) => {
                            await firebase
                                .firestore()
                                .collection("cartItems")
                                .doc(item)
                                .get()
                                .then(async (doc) => {
                                    const product = doc.data();
                                    await firebase
                                        .firestore()
                                        .collection("products")
                                        .doc(product.productId)
                                        .get()
                                        .then((doc) => {
                                            items.push({
                                                product: { ...doc.data() },
                                                ...product,
                                                id: doc.id,
                                            });

                                            if (i === data.items.length - 1) {
                                                data.items = items;
                                                products.push(data);
                                            }
                                            if (
                                                index ===
                                                querySnapshot.size - 1
                                            ) {
                                                dispatch({
                                                    type: "SET_ORDERS",
                                                    payload: products,
                                                });
                                            }
                                        });
                                });
                        });
                    });
                }
            });
    };

    //product => qty, product id, shop id
    const handleAddToCart = async (product, showSuccessModal) => {
        const oldProduct = state.cart.find(
            (p) => p.productId === product.productId
        );
        if (oldProduct) {
            const qty = Number(product.qty) + Number(oldProduct.qty);
            if (qty <= oldProduct.product.maxQtyPerOrder) {
                await firebase
                    .firestore()
                    .collection("cartItems")
                    .doc(oldProduct.id)
                    .update({ qty })
                    .then(() => showSuccessModal(true))
                    .catch((error) => showMessage(error.message, "error"));
            } else {
                showMessage(
                    `You can only order up to ${oldProduct.product.maxQtyPerOrder} pcs.`,
                    "error"
                );
            }
        } else {
            const payload = {
                userId: state.user.id,
                ordered: false,
                ...product,
            };
            await firebase
                .firestore()
                .collection("cartItems")
                .add(payload)
                .then(() => showSuccessModal(true))
                .catch((error) => showMessage(error.message, "error"));
        }
    };

    const handleRemoveFromCart = async (id) => {
        await firebase
            .firestore()
            .collection("cartItems")
            .doc(id)
            .delete()
            .then(() => console.log("success"))
            .catch((error) => showMessage(error.message, "error"));
    };

    const handleUpdateCart = async (product) => {
        await firebase
            .firestore()
            .collection("cartItems")
            .doc(product.id)
            .update({ qty: product.qty })
            .then(() => console.log("success"))
            .catch((error) => showMessage(error.message, "error"));
    };

    const handleAddAddress = async (values, setActive, setAddAddress) => {
        const payload = { ...values, userId: state.user.id };
        await firebase
            .firestore()
            .collection("addresses")
            .add(payload)
            .then((doc) => {
                dispatch({
                    type: "SET_ADDRESS",
                    payload: { ...payload, id: doc.id },
                });
                showMessage("Address added!", "success");
                setActive(0);
                setAddAddress(false);
            })
            .catch((error) => showMessage(error.message, "error"));
    };

    const handleCheckout = (cart, selected, orderDetails, cash) => {
        const orders = groupCartOrdersByShippingDate(cart, selected);
        console.log(orders);
        dispatch({ type: "SET_PAYING", payload: true });
        const updatedUserCash =
            Number(state.user.cash) -
            Number(cash) +
            Number(orderDetails.cashToEarn.raw);
        Object.keys(orders).map(async (order, index) => {
            const ids = orders[order].map((i) => i.id);
            const payload = {
                orderId: generateOrderId(),
                shippingAddress: state.address,
                shopper: state.shopperDetails,
                ...orderDetails,
                shippedDate: order,
                total: orderDetails.total[order],
                subtotal: orderDetails.subtotal[order],
                shippingFee: orderDetails.shippingFee[order],
                cashToEarn: orderDetails.cashToEarn[order],
                itemsCount: orderDetails.itemsCount[order],
                cashUsed: orderDetails.cashUsed[order],
                items: ids,
            };
            await firebase
                .firestore()
                .collection("orders")
                .add(payload)
                .then(() => {
                    orders[order].forEach(async (item, i) => {
                        await firebase
                            .firestore()
                            .collection("products")
                            .doc(item.product.id)
                            .update({
                                stock:
                                    Number(item.product.stock) -
                                    Number(item.qty),
                            });

                        await firebase
                            .firestore()
                            .collection("cartItems")
                            .doc(item.id)
                            .update({ ordered: true })
                            .then(() => {
                                if (
                                    index === Object.keys(orders).length - 1 &&
                                    i === orders[order].length - 1
                                ) {
                                    dispatch({
                                        type: "SET_PAYING",
                                        payload: false,
                                    });
                                }
                            })
                            .catch((error) =>
                                showMessage(error.message, "error")
                            );
                    });
                })
                .catch((error) => showMessage(error.message, "error"));

            await firebase
                .firestore()
                .collection("users")
                .doc(state.user.id)
                .update({ cash: updatedUserCash })
                .then(() => console.log("success"))
                .catch((error) => showMessage(error.message, "error"));
        });
    };

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider
                value={{
                    dispatch,
                    userLogin,
                    userLoginWithSocialMedia,
                    userRegister,
                    resendEmailVerification,
                    handleAddToCart,
                    handleRemoveFromCart,
                    handleUpdateCart,
                    handleAddAddress,
                    handleCheckout,
                }}
            >
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
};

export const useUserState = () => {
    const userStateContext = useContext(UserStateContext);
    if (userStateContext === undefined) {
        throw new Error("userStateContext must be used within a UserProvider");
    }
    return userStateContext;
};

export const useUserDispatch = () => {
    const userDispatchContext = useContext(UserDispatchContext);
    if (userDispatchContext === undefined) {
        throw new Error(
            "userDispatchContext must be used within a UserProvider"
        );
    }
    return userDispatchContext;
};

export default UserProvider;
