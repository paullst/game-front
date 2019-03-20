import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from "@env/environment";
import { HttpParams, HttpClient } from '@angular/common/http';
import { Move } from '@app/model/move.model';
import { State } from '@app/model/state.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Game Service
 */
export class GameService {

  // API URL
  api: string;

  constructor(
    private http: HttpClient
  ) {

    // Set API URL
    this.api = environment.api;
  }

  /**
   * Get new game
   * @param player1 
   * @param player2
   * @returns game id
   */
  createGame(player1: string, player2: string): Observable<number> {

    // Set players usernames
    const params: HttpParams = new HttpParams()
      .set('player1', player1)
      .set('player2', player2)

    return this.http.get<number>(`${this.api}/new`, { params });
  }

  /**
   * Post new move
   * @param gameId 
   * @param move 
   * @returns new state
   */
  postMove(gameId: number, move: Move): Observable<State> {
    return this.http.post<State>(`${this.api}/game/${gameId}/move`, move);
  }

}