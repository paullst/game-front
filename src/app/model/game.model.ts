import { State } from './state.model';

export class Game {
    id: number;
    player1: string;
    player2: string;
    winner: string;
    states: State[];
}