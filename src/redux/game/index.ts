import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame, IPlayerInGame } from "../../types";

export const initialState: IGame = {
  room: "",
  players: [],
};

const gameSlice = createSlice({
  name: "game",
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
    addPlayer: (state, action: PayloadAction<IPlayerInGame>) => {
      state.players = [...state.players, action.payload];
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(
        (player: IPlayerInGame) => player.name != action.payload
      );
    },
    updatePlayer: (state, action: PayloadAction<IPlayerInGame>) => {
      console.log(action.payload);
      state.players = state.players.map((player: IPlayerInGame) =>
        player.name == action.payload.name
          ? {
              ...player,
              cur_position: action.payload.cur_position,
              new_position_position: action.payload.new_position,
            }
          : player
      );
    },
    roomState: (state, action: PayloadAction<string[]>) => {
      let new_mems = action.payload.filter(
        (player) =>
          state.players.findIndex((cur_player) => cur_player.name == player) < 0
      );
      state.players = [
        ...state.players,
        ...new_mems.map((new_mem) => ({
          name: new_mem,
          cur_position: { x: 0, y: 0 },
          new_position: { x: 0, y: 0 },
        })),
      ];
    },
  },
});

export const { setRoom, removeRoom, addPlayer, removePlayer, updatePlayer } =
  gameSlice.actions;
export default gameSlice;

export const { actions: gameActions, reducer } = gameSlice;

export const useGameSlice = () => {
  return { actions: gameSlice.actions };
};
