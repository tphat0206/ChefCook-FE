import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  User, Account } from "../../types";
import LOCAL_STORAGE_KEYS from "../../configs/local_storage";

export const initialState: User = {
    isLoggedIn: !!localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY),
    account: undefined,
    access_token: undefined,
    mqtt_topic: "",
};

const userSlice = createSlice({
    name: "auth",
    initialState: () => ({
        ...initialState,
    }),
    reducers: {
        setAccount: (state, action: PayloadAction<Account | undefined>) => {
            state.account = action.payload ? { ...action.payload } : undefined;
        },
        removeAccount: (state) => {
            state.account = undefined;
        },
        setToken: (state, action: PayloadAction<string>) => {
            localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, action.payload);
            state.isLoggedIn = true;
        },
        removeToken: (state) => {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
            state.isLoggedIn = false;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.account = action.payload.account;
            state.mqtt_topic = action.payload.mqtt_topic;
        },
    },
});

export const { setAccount, removeAccount, setToken, removeToken } = userSlice.actions;
export default userSlice;

export const { actions: loginFormActions, reducer } = userSlice;

export const useAuthSlice = () => {
    return { actions: userSlice.actions };
};