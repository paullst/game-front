import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { GameService } from '@services/game/game.service';
import { Observable } from 'rxjs';

/**
 * Game Resolver
 */
@Injectable()
export class CountryRefResolver implements Resolve<Map<string, string[]>> {

    constructor(private gameService: GameService) { }

    resolve(): Observable<Map<string, string[]>> {
        return this.gameService.getCountryRef();
    }
}