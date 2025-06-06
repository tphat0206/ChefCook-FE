
export interface IPosition {
    x: number
    y: number
}
export interface IPlayerInWaitingRoom {
    name: string
    is_ready: boolean
}

export interface IPlayerInGame {
    name: string
    cur_position: IPosition
    new_position: IPosition
}

export interface IGame {
    room: string
    players: IPlayerInGame[]
}

export interface IWaitingRoom {
    room: string
    players: IPlayerInWaitingRoom[]
}

