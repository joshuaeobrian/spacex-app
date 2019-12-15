import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableRowComponent} from './table-row.component';
import {By} from '@angular/platform-browser';

describe('TableRowComponent', () => {
  let component: TableRowComponent;
  let fixture: ComponentFixture<TableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowComponent);
    component = fixture.componentInstance;
    component.launch = {
        flight_number: 1,
        rocket: {rocket_id: 'totat flight 1', rocket_name: 'flight 1'},
        details: null,
        links: {presskit: null},
        launch_year: '2012'
      };
    fixture.detectChanges();
  });

  it('should create as table row', () => {
    expect(component).toBeTruthy();
  });
});
