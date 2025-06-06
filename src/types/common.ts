import { IGame, IWaitingRoom } from "./game";

export interface RootState {
    auth?: User;
    game?: IGame
    waitingRoom?: IWaitingRoom
}

export interface Account {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    position: string;
    company: string;
}

export interface User {
    isLoggedIn: boolean;
    access_token: string | undefined;
    account: Account | undefined;
    mqtt_topic: string;
}
