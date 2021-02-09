import React, { useEffect, useContext, createContext, useReducer } from "react";
import reducer from "./reducer";
import firebase, { facebook, twitter, google } from "../../api/firebase";

const initialState = {
    user: undefined,
    loading: true,
    msg: undefined,
};

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext(undefined);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const userRegister = (values) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((credential) => {
                if (credential) {
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(credential.user.uid)
                        .set({
                            email: values.email,
                            country: values.country,
                            firstName: values.firstName,
                            lastName: values.lastName,
                        })
                        .then(() => console.log("success"))
                        .catch((error) => showMessage(error.message, "error"));
                }
            })
            .catch((error) => {
                showMessage(error.message, "error");
            });
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
            .then((e) => {
                return;
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
                                    key: currentUser.id,
                                },
                            });
                        }
                    });
            } else {
                dispatch({ type: "SET_USER", payload: undefined });
            }
        });
    }, []);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider
                value={{
                    dispatch,
                    userLogin,
                    userLoginWithSocialMedia,
                    userRegister,
                    resendEmailVerification,
                }}
            >
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

export const useAuthState = () => {
    const authStateContext = useContext(AuthStateContext);
    if (authStateContext === undefined) {
        throw new Error("authStateContext must be used within a AuthProvider");
    }
    return authStateContext;
};

export const useAuthDispatch = () => {
    const authDispatchContext = useContext(AuthDispatchContext);
    if (authDispatchContext === undefined) {
        throw new Error(
            "authDispatchContext must be used within a AuthProvider"
        );
    }
    return authDispatchContext;
};

export default AuthProvider;
