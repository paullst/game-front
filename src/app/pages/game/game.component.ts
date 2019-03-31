import europe from "@amcharts/amcharts4-geodata/worldLow";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Country } from '@models/country.model';
import { Move } from '@models/move.model';
import { State } from '@models/state.model';
import { MoveService } from '@services/move/move.service';


am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
/**
 * Game component
 */
export class GameComponent implements OnInit, OnDestroy {

  // Map state
  state: State;

  // AMChart Map
  map: am4maps.MapChart;

  // Country referential
  ref: Map<string, string[]>;

  // Move
  move: Move;

  // Colors
  color1 = '#85144b';
  color2 = '#0074D9';

  // Pop
  pop1: number = null;
  pop2: number = null;

  constructor(
    private route: ActivatedRoute,
    private moveService: MoveService
  ) {
  }

  ngOnInit() {

    // Get country ref
    this.ref = this.route.snapshot.data['ref'];

    // Get initial state
    const state: State = this.route.snapshot.data['state']
    this.state = state;
    this.handleState(state);

  }

  /**
   * Make map state
   * @param state 
   */
  makeMapState(state: State): Country[] {
    let countries: Country[] = Object.values(state.map);

    // Set country colors
    countries.forEach(c => {
      if (c.owner !== null) {
        c.owner === state.game.player1 ? c.fill = this.color1 : c.fill = this.color2;
      }
    })

    return countries;
  }

  /**
   * Make visual map
   * @param state Init AMChart Map
   */
  makeMap(state: Country[]) {

    if (this.map) {
      this.map.dispose();
    }

    let map = am4core.create("chartdiv", am4maps.MapChart);

    map.geodata = europe;

    // Set projection
    map.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    polygonSeries.data = state;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{label} / {pop}";
    polygonTemplate.fill = am4core.color("#EFEFEF");

    // Fill name, pop and color
    polygonTemplate.propertyFields.fill = "fill";

    // Handle click
    polygonTemplate.events.on("hit", (ev) => {
      this.move = this.moveService.handleClick(ev.target, this.move, this.state, this.ref);
    });

    // TODO: Handle mouse over and mouse out
    polygonTemplate.events.on("over", (ev) => {
    });
    polygonTemplate.events.on("out", (ev) => {
    });

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color('#DEDEDE');

    // Set map countries
    polygonSeries.include = [...state.map(c => c.id), "GB"];;

    this.map = map;

  }

  /**
   * Send move to API
   */
  attack() {
    this.moveService.postMove(this.state.game.id, this.move).subscribe(
      state => {
        this.handleState(state);
      },
      err => {
        console.log(err) // TODO : handle error
      }
    )
  }

  /**
   * Count total pop for given player
   * @param player 
   */
  countTotalPop(player: string) {
    return Object.values(this.state.map)
      .filter(c => c.owner === player)
      .reduce((a, v) => a + v.pop, 0);
  }

  /**
   * Handle game state
   * @param state 
   */
  handleState(state: State) {
    const mapState = this.makeMapState(state);
    this.makeMap(mapState);
    this.state = state;

    // Init move
    this.move = new Move(null, null, state.nextPlayer, null);

    // Count pop
    this.pop1 = this.countTotalPop(state.game.player1);
    this.pop2 = this.countTotalPop(state.game.player2);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.dispose();
    }
  }
}
