import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./index";
import type { RootState } from "../../types";


const selectDomain = (state: RootState) => state.waitingRoom ?? initialState;

export const selectWaitingRoom = createSelector([selectDomain], (waitingRoomState) => waitingRoomState.room);

export const selectWaitingRoomPlayers = createSelector([selectDomain], (waitingRoomState) => waitingRoomState.players);

