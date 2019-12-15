import { TestBed } from '@angular/core/testing';

import { LaunchTableService } from './launch-table.service';
import {HttpClientModule} from '@angular/common/http';

describe('LaunchTableService', () => {
  // let service: LaunchTableService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [LaunchTableService]
    });
  });

  it('should be created', () => {
    const service: LaunchTableService = TestBed.get(LaunchTableService);
    expect(service).toBeTruthy();
  });
});
