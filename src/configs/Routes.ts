const AppRoutes = {
    HomePage: "/",
    Game: (room?: string, user?: string) =>
        `/game/${room ?? ":room"}/${user ?? ":user"}`,
    WaitingRoom: (room?: string, user?: string) =>
        `/waitingRoom/${room ?? ":room"}/${user ?? ":user"}`,
};

export default AppRoutes;
