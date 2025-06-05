
export interface Position {
    x: number
    y: number
}
export interface Player {
    name: string
    cur_position: Position
    new_position: Position
}

export interface Game {
    room: string
    players: Player[]
}

