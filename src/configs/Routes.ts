const AppRoutes = {
    HomePage: '/',
    Game: (room?:string, user?: string) => `/game/${room ?? ':room'}/${user ?? ':user'}`
}

export default AppRoutes