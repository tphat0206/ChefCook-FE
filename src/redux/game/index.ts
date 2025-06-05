import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, Player } from "../../types";

export const initialState: Game = {
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
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players = [...state.players, action.payload];
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(
        (player: Player) => player.name != action.payload
      );
    },
    updatePlayer: (state, action: PayloadAction<Player>) => {
      console.log(action.payload)
      state.players = state.players.map((player: Player) =>
        player.name == action.payload.name
          ? {
              ...player,
              cur_position: action.payload.cur_position,
              new_position_position: action.payload.new_position,
            }
          : player
      );
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
