import React, { useEffect, useContext, createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import reducer from "./reducer";
import firebase, { facebook, twitter, google } from "../../api/firebase";

const initialState = {
    user: {},
    loading: true,
    msg: undefined,
};

const UserStateContext = createContext(initialState);
const UserDispatchContext = createContext(undefined);

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

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

    const addUserToCollection = async (uid, payload) => {
        await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .set(payload)
            .then(() => console.log("success"))
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

    const showMessage = (err, type) => {
        dispatch({ type: "SHOW_MSG", payload: { msg: err, type } });
        setTimeout(() => dispatch({ type: "SHOW_MSG", payload: null }), 3000);
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

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
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
            } else {
                dispatch({ type: "SET_USER", payload: undefined });
                history.push("/login");
            }
        });
    }, []);

    //product => qty, product id, shop id
    const handleAddToCart = async (product) => {
        const payload = {
            userId: state.user.id,
            ...product,
        };
        await firebase
            .firestore()
            .collection("cartItems")
            .add(payload)
            .then(() => console.log("doneeee"))
            .catch((error) => showMessage(error.message, "error"));
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
