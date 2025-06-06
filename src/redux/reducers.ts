/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./auth";
import gameSlice from "./game";
import waitingRoomSlice from "./waitingRoom";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer() {
    // Initially we don't have any injectedReducers, so returning identity function to avoid the error
    const globalReducers = {
        auth: userSlice.reducer,
        game: gameSlice.reducer,
        waitingRoom: waitingRoomSlice.reducer,
    };
    return combineReducers({
        ...globalReducers,
    });
}
