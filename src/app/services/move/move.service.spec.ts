import { TestBed } from '@angular/core/testing';

import { MoveService } from './move.service';
import { MapPolygon } from '@amcharts/amcharts4/maps';
import { State } from '@app/model/state.model';
import { Move } from '@app/model/move.model';

describe('MoveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoveService = TestBed.get(MoveService);
    expect(service).toBeTruthy();
  });

  // TODO
  it('#isSelectingFromCountry should return true', () => {
    const service: MoveService = TestBed.get(MoveService);
    
    // expect(service.isSelectingFromCountry())
  });

});
