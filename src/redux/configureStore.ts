import { configureStore } from "@reduxjs/toolkit";
import { createReducer } from "./reducers";

export function configureAppStore(preloadedState = {}) {
    return configureStore({
        reducer: createReducer(),
        preloadedState,
    });
}

export const store = configureAppStore();
