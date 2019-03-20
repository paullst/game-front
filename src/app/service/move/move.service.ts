import { Injectable } from '@angular/core';
import { Move } from '@app/model/move.model';

import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4core from "@amcharts/amcharts4/core";

import { State } from '@app/model/state.model';
import { Country } from '@app/model/country.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Move Service
 */
export class MoveService {

  move: Move;
  state: State;
  ref: Map<string, string[]>;

  originColor = '#FFDC00';
  destinationColor = '#FF851B';
  standardColor = '#EFEFEF';

  // Clicked country ISO code
  targetCountry: string;

  // Target country polygon
  targetCountryPolygon: am4maps.MapPolygon;

  constructor() { }

  /**
   * Handle user click
   * @param target 
   * @param move 
   * @param state 
   * @param ref 
   * @returns move
   */
  handleClick(target: am4maps.MapPolygon, move: Move, state: State, ref: Map<string, string[]>): Move {

    // Set instance variables
    this.move = move;
    this.state = state;
    this.ref = ref;
    this.targetCountry = target.dataItem.dataContext['id'];
    this.targetCountryPolygon = target;

    // Select from country
    if (this.isSelectingFromCountry()) {
      move.from = this.targetCountry;
      this.color(this.originColor);

      // Unselect from country
    } else if (this.isUnselectingFromCountry()) {
      move.from = null;
      this.color(state.map[this.targetCountry].fill);

      // Select to country
    } else if (this.isSelectingToCountry() && (this.isInvading() || this.isMovingPop())) {
      move.to = this.targetCountry;
      move.pop = state.map[this.targetCountry].pop;
      this.color(this.destinationColor);

      // Unselect to country
    } else if (this.isUnselectingCountry()) {
      move.to = null;
      this.color(state.map[this.targetCountry].fill !== undefined ? state.map[this.targetCountry].fill : this.standardColor);
    }

    return move;

  }

  protected isSelectingFromCountry(): boolean {
    return this.move.from === null && this.state.map[this.targetCountry].owner === this.move.player && this.state.map[this.targetCountry].pop;
  }

  isUnselectingFromCountry(): boolean {
    return this.move.from === this.targetCountry && this.move.to === null;
  }

  isSelectingToCountry(): boolean {
    return this.move.from !== null && this.move.to === null && this.ref[this.targetCountry].some(c => c === this.move.from)
  }

  isInvading(): boolean {
    return this.state.map[this.targetCountry].owner !== this.move.player && this.state.map[this.targetCountry].pop <= this.state.map[this.move.from].pop;
  }

  isMovingPop(): boolean {
    return this.state.map[this.targetCountry].owner === this.move.player;
  }

  isUnselectingCountry(): boolean {
    return this.move.to === this.targetCountry;
  }

  /**
   * Change polygon color
   * @param color 
   */
  private color(color: string): void {
    this.targetCountryPolygon.polygon.fill = am4core.color(color);
  }

}
