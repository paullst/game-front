import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '@models/state.model';
import { environment } from "@env/environment";
import { Observable } from 'rxjs';

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
 * Get country referential
 */
  public getCountryRef(): Observable<Map<string, string[]>> {
    return this.http.get<Map<string, string[]>>(`${environment.api}/country-ref/`)
  }

  /**
   * Get last state by game id
   * @param gameId 
   */
  public getLastStateByGameId(gameId: string): Observable<State> {
    return this.http.get<State>(`${environment.api}/game/${gameId}`)
  }

}