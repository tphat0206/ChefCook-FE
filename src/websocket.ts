import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGameSlice } from "./redux/game";
const websocket_host = import.meta.env.VITE_REACT_APP_WEBSOCKET;

interface WebSocketInfo {
  room: string;
  user: string;
}

let ws : WebSocket | null = null
export const useWebsocket = (socket_info: WebSocketInfo) => {
  const { room, user } = socket_info;
  const dispatch = useDispatch();
  const { actions } = useGameSlice();


  useEffect(() => {
    ws = new WebSocket(`ws://${websocket_host}/ws/room/${room}/?${user}`);

    ws.onopen = () => {
      console.log("Successfully connected to the WebSocket.");
    };
    ws.onclose = () => {
      console.log(
        "WebSocket connection closed unexpectedly. Trying to reconnect in 2s..."
      );
      setTimeout(function () {
        console.log("Reconnecting...");
      }, 2000);
    };

    return () => {
      ws?.close();
    };
  }, [room, user]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        console.log(data);

        switch (data.type) {
            case "chat_message":
                console.log(data.message)
                dispatch(actions.updatePlayer({
                    name: data.user,
                    cur_position: data.message,
                    new_position: data.message,
                }))
                break;
            case "joined_room":
                console.log(data.message)
                dispatch(actions.addPlayer({
                    name: data.user,
                    cur_position: data.message,
                    new_position: data.message,
                }))
                break
            default:
                console.error("Unknown message type!");
                break;
        }
    };
  }, []);
  console.log(ws)
  return ws
};

