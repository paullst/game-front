import { Country } from './country.model';
import { Game } from './game.model';

export class State {
    id: number;
    moveNo: number;
    map: Map<string, Country>;
    nextPlayer: string;
    game: Game;
}