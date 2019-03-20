import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { State } from '@app/model/state.model';


/**
 * Country service
 */
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

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
