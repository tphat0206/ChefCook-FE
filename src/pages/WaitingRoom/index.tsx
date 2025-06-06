import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Grid,
    Stack,
    Button,
} from "@mui/material";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectWaitingRoomPlayers } from "../../redux/waitingRoom/selectors";
import { useWebsocket } from "../../websocket";
import WSs from "../../configs/WSs";

const WaitingRoom = () => {
    const players = useSelector(selectWaitingRoomPlayers);
    const ws = useRef<WebSocket | null>(null);
    const { room, user } = useParams();
    ws.current = useWebsocket({
        path: WSs.WaitingRoom(room ?? "", user ?? ""),
    });
    const currentPlayer = useMemo(
        () => players.find((p) => p.name === user),
        [players]
    );

    const isReady = useMemo(() => currentPlayer?.is_ready, [players]);

    const isHost = useMemo(
        () => players.findIndex((p) => p.name === user) == 0,
        [players]
    );

    const handleReadyToggle = () => {
        const newReadyStatus = !isReady;
        ws.current?.send(
            JSON.stringify({
                message: { is_ready: newReadyStatus },
            })
        );
    };

    const handleStartGame = () => {
        console.log("Starting Game!");
    };

    const allPlayersReady = players.every((player) => player.is_ready);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Room: ABCDE123
                    </Typography>
                    <Typography variant="subtitle1">
                        {players.length} / 5 Players
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "calc(100vh - 64px - 64px - 32px)",
                        justifyContent: "center",
                        p: 3,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 1,
                    }}
                >
                    <Typography component="h1" variant="h4" gutterBottom>
                        Waiting Room
                    </Typography>

                    <Grid
                        container
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ my: 4 }}
                    >
                        {players.map((player) => (
                            <Grid component="div" key={player.name}>
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        component="p"
                                        sx={{
                                            fontWeight:
                                                player.name === user
                                                    ? "bold"
                                                    : "normal",
                                        }}
                                    >
                                        {player.name}
                                    </Typography>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>

                    <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                        {!isHost ? (
                            <Button
                                variant="contained"
                                color={isReady ? "success" : "primary"}
                                size="large"
                                onClick={handleReadyToggle}
                            >
                                {isReady ? "Ready!" : "Click to Ready Up"}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleStartGame}
                                disabled={
                                    !allPlayersReady || players.length < 2
                                }
                            >
                                Start Game (
                                {players.filter((p) => p.is_ready).length}/
                                {players.length} Ready)
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Container>
        </div>
    );
};

export default WaitingRoom;
