import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { State } from '@models/state.model';
import { GameService } from '@services/game/game.service';
import { Observable } from 'rxjs';

/**
 * Game Resolver
 */
@Injectable()
export class InitialStateResolver implements Resolve<State> {

    constructor(private gameService: GameService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<State> {
        const id = route.paramMap.get('id');
        return this.gameService.getLastStateByGameId(id);
    }
}