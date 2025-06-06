import {
    Container,
    Grid,
    Box,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../../configs/Routes";

const HomePage = () => {
    const [playerName, setPlayerName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();
    const onSubmit = (e: any) => {
        navigate(AppRoutes.WaitingRoom(roomCode, playerName));
        e.preventDefault();
    };

    return (
        <div>
            <Container component="main" maxWidth="md">
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    style={{ minHeight: "calc(100vh - 64px)" }}
                >
                    <Grid size={{ xs: 6, md: 7 }} component="div">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                p: 3,
                                borderRadius: 2,
                                boxShadow: 3,
                                bgcolor: "background.paper",
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                gutterBottom
                            >
                                Welcome to the Game!
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Your Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={playerName}
                                    onChange={(e) =>
                                        setPlayerName(e.target.value)
                                    }
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="room"
                                    label="Room Code (optional)"
                                    id="room"
                                    value={roomCode}
                                    onChange={(e) =>
                                        setRoomCode(e.target.value)
                                    }
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={onSubmit}
                                >
                                    Join Game
                                </Button>
                                {/* Optional: Add a button to "Create New Room" */}
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mt: 1 }}
                                    onClick={() =>
                                        console.log("Create New Room")
                                    }
                                >
                                    Create New Room
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default HomePage;
