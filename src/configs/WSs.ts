const WSs = {
    WaitingRoom: (room: string, user: string) => `/room/${room}/?${user}`,
    Game: (room: string, user: string) => `/room/${room}/?${user}`,
};

export default WSs