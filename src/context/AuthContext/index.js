import React, { useEffect, useContext, createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import reducer from "./reducer";
import firebase, { facebook, twitter, google } from "../../api/firebase";

const initialState = {
    user: undefined,
    loading: true,
};

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext(undefined);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    // const userRegister = async (email, password) => {
    //   const response = await register(email, password);
    //   if (response.success) {
    //     history.push("/login");
    //   } else {
    //     console.log("error");
    //   }
    // };

    const userLogin = (email, password, isSubmitting) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((e) => {
                console.log(e);
                isSubmitting(false);
            })
            .catch((error) => {
                console.log(error);
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
            .catch((error) => {
                console.log(error);
                return;
            });
    };

    // const userLogout = async () => {
    //   const response = await logout();
    //   if (response.success) {
    //     dispatch({ type: "LOGOUT", payload: response });
    //   } else {
    //     console.log("error");
    //   }
    // };

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userAuth) => {
            if (userAuth) {
                dispatch({ type: "SET_USER", payload: userAuth });
            }
        });
    }, []);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider
                value={{ dispatch, userLogin, userLoginWithSocialMedia }}
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
