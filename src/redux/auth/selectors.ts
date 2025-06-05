import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./index";
import type { RootState } from "../../types";


const selectDomain = (state: RootState) => state.auth ?? initialState;

export const selectAccount = createSelector([selectDomain], (authState) => authState.account);

export const selectMqttTopic = createSelector([selectDomain], (authState) => authState.mqtt_topic);

export const selectIsLoggedIn = createSelector([selectDomain], (authState) => ({
    isLoggedIn: authState.isLoggedIn,
}));

export const selectAccountAvatar = createSelector([selectDomain], (authState) =>
    authState.account
        ? `https://api.dicebear.com/8.x/initials/svg?seed=${authState.account?.first_name[0]}${authState.account?.last_name[0]}`
        : ""
);
