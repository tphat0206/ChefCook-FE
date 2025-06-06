import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayerInWaitingRoom, IWaitingRoom } from "../../types";

export const initialState: IWaitingRoom = {
    room: "",
    players: [],
};

const waitingRoomSlice = createSlice({
    name: "waitingRoom",
    initialState: () => ({
        ...initialState,
    }),
    reducers: {
        setRoom: (state, action: PayloadAction<string>) => {
            state.room = action.payload;
        },
        removeRoom: (state) => {
            state.room = "";
        },
        addPlayer: (state, action: PayloadAction<IPlayerInWaitingRoom>) => {
            state.players = [...state.players, action.payload];
        },
        removePlayer: (state, action: PayloadAction<string>) => {
            state.players = state.players.filter(
                (player: IPlayerInWaitingRoom) => player.name != action.payload
            );
        },
        updatePlayer: (state, action: PayloadAction<IPlayerInWaitingRoom>) => {
            console.log(action.payload);
            state.players = state.players.map((player: IPlayerInWaitingRoom) =>
                player.name == action.payload.name
                    ? {
                          ...player,
                          is_ready: action.payload.is_ready,
                      }
                    : player
            );
        },
        roomState: (state, action: PayloadAction<IPlayerInWaitingRoom[]>) => {
            state.players = action.payload;
        },
    },
});

export const { setRoom, removeRoom, addPlayer, removePlayer, updatePlayer } =
    waitingRoomSlice.actions;
export default waitingRoomSlice;

export const { actions: waitingRoomActions, reducer } = waitingRoomSlice;

export const useWaitingRoomSlice = () => {
    return { actions: waitingRoomSlice.actions };
};
