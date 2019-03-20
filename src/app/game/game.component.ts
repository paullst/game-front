import { Component, NgZone, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import * as am4maps from "@amcharts/amcharts4/maps";
import europe from "@amcharts/amcharts4-geodata/worldLow";
import { Country } from '@app/model/country.model';
import { CountryService } from '@app/service/country/country.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { State } from '@app/model/state.model';
import { Move } from '@app/model/move.model';
import { move } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { GameService } from '@app/service/game/game.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MoveService } from '@app/service/move/move.service';

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
    private zone: NgZone,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private modalService: NgbModal,
    private moveService: MoveService
  ) {
  }

  ngOnInit() {

    // Fetch country ref
    this.countryService.getCountryRef().subscribe(
      ref => this.ref = ref,
      err => console.log(err)) // TODO: error handling

    // Fetch last state
    this.route.url.pipe(
      switchMap(url => this.countryService.getLastStateByGameId(url[0].path)),
    ).subscribe(
      state => {
        this.handleState(state);
        this.pop1 = this.countTotalPop(state.game.player1);
        this.pop2 = this.countTotalPop(state.game.player2);
      },
      err => console.log(err) // TODO: error handling
    );

  }

  /**
   * Build map
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
   * Init Map
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
    this.gameService.postMove(this.state.game.id, this.move).subscribe(
      state => {
       this.handleState(state);
      }
    )
  }

  /**
   * Count total pop for given player
   * @param player 
   */
  countTotalPop(player: string) {
    return Object.values(this.state.map).filter(c => c.owner === player).reduce((a, v) => a + v.pop, 0);
  }

  /**
   * Handle game state
   * @param state 
   */
  handleState(state: State) {
    const initMap = this.makeMapState(state);
    this.makeMap(initMap);
    this.state = state;

    // Init move
    this.move = new Move(null, null, state.nextPlayer, null);
  }

  ngOnDestroy() {
      if (this.map) {
        this.map.dispose();
      }
  }
}
