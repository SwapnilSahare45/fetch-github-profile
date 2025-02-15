import axios from "axios";
import { createContext, useReducer } from "react";

const initalState = {
    // userName: null,
    profile: null,
    loading: false,
    error: null
}

const profileReducer = (state, action) => {
    switch (action.type) {
        // case "NAME":
        //     return { ...state, userName: action.payload };
        case "PENDING":
            return { ...state, loading: true, error: null };
        case "SUCCESS":
            return { ...state, loading: false, profile: action.payload };
        case "ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            throw new Error(`Unhandled action type : ${action.type}`);
    }
}

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profileReducer, initalState);

    const getProfile = async (userName) => {
        dispatch({ type: "PENDING" });
        try {
            const response = await axios.get(`https://api.github.com/users/${userName}`);
            console.log(response.data)
            dispatch({ type: "SUCCESS", payload: response.data });
        } catch (error) {
            dispatch({ type: "ERROR", payload: "No user found" })
        }
    }

    return (
        <ProfileContext.Provider value={{ state, dispatch, getProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}