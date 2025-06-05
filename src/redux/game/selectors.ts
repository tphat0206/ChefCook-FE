import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./index";
import type { RootState } from "../../types";


const selectDomain = (state: RootState) => state.game ?? initialState;

export const selectRoom = createSelector([selectDomain], (gameState) => gameState.room);

export const selectPlayers = createSelector([selectDomain], (gameState) => gameState.players);

