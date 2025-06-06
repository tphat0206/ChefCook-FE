import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGameSlice } from "./redux/game";
import { useWaitingRoomSlice } from "./redux/waitingRoom";
const websocket_host = import.meta.env.VITE_REACT_APP_WEBSOCKET;

interface WebSocketInfo {
    path: string;
}

let ws: WebSocket | null = null;
export const useWebsocket = (socket_info: WebSocketInfo) => {
    const { path } = socket_info;
    const dispatch = useDispatch();
    const { actions: gameActions } = useGameSlice();
    const { actions: waitingRoomActions } = useWaitingRoomSlice();

    useEffect(() => {
        ws = new WebSocket(`ws://${websocket_host}/ws${path}`);

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
            console.log("Connection closed");
            ws?.close();
        };
    }, [path]);

    useEffect(() => {
        if (!ws) return;

        ws.onmessage = (e: MessageEvent) => {
            const data = JSON.parse(e.data);
            console.log(data);

            switch (data.type) {
                case "update_status":
                    console.log(data.message);
                    dispatch(
                        waitingRoomActions.updatePlayer({
                            name: data.user,
                            is_ready: data.message.is_ready,
                        })
                    );
                    break;
                case "room_state":
                    console.log(data.message);
                    dispatch(waitingRoomActions.roomState(data.message));
                    break;
                case "joined_room":
                    console.log(data.message);
                    dispatch(
                        gameActions.updatePlayer({
                            name: data.user,
                            cur_position: data.message,
                            new_position: data.message,
                        })
                    );
                    break;
                default:
                    console.error("Unknown message type!");
                    break;
            }
        };
    }, []);
    console.log(ws);
    return ws;
};
