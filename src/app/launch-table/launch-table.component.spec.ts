import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LaunchTableComponent} from './launch-table.component';
import {LaunchTableService} from './launch-table.service';
import {TableRowComponent} from './table-row/table-row.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('LaunchTableComponent', () => {
  let component: LaunchTableComponent;
  let fixture: ComponentFixture<LaunchTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [LaunchTableService],
      declarations: [LaunchTableComponent, TableRowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchTableComponent);
    component = fixture.componentInstance;
    component.setLaunchTableData([{
      flight_number: 2,
      rocket: {rocket_id: 'totat flight 1', rocket_name: 'flight 2'},
      details: 'This rocket went far',
      links: {presskit: null},
      launch_year: '2012'
    }, {
      flight_number: 3,
      rocket: {rocket_id: 'totat flight 3', rocket_name: 'flight 3'},
      details: 'This rocket went an okay distance',
      links: {presskit: null},
      launch_year: '2014'
    }, {
      flight_number: 1,
      rocket: {rocket_id: 'totat flight 2', rocket_name: 'flight 1'},
      details: 'This rocket went an okay distance',
      links: {presskit: null},
      launch_year: '2013'
    }]);
    fixture.detectChanges();
  });

  it('should create a table', () => {
    expect(component).toBeTruthy();
  });
  it('should increment page and startIndex', () => {
    component.page = 1;
    component.pages = 10;
    component.startIndex = 0;
    fixture.detectChanges();
    component.onNextClick();
    fixture.detectChanges();
    expect(component.page).toBe(2);
    expect(component.startIndex).toBe(10);
  });
  it('should decrement page and startIndex', () => {
    component.page = 2;
    component.pages = 3;
    component.startIndex = 10;
    fixture.detectChanges();
    component.onPreviousClick();
    fixture.detectChanges();
    expect(component.page).toBe(1);
    expect(component.startIndex).toBe(0);
  });

  it('should set the launch data and pages', () => {
    expect(component.launches.length).toBe(3);
    component.itemsPerPage = 1;
    component.setLaunchTableData([{
      flight_number: 1,
      rocket: {rocket_id: 'totat flight 1', rocket_name: 'flight 1'},
      details: 'This rocket went far',
      links: {presskit: null},
      launch_year: '2012'
    }, {
      flight_number: 2,
      rocket: {rocket_id: 'totat flight 2', rocket_name: 'flight 1'},
      details: 'This rocket went an okay distance',
      links: {presskit: null},
      launch_year: '2013'
    }]);
    fixture.detectChanges();
    expect(component.itemsPerPage).toBe(1);
    expect(component.launches.length).toBe(2);
    expect(component.pages).toBe(2);
  });

  it('should change the orderByAcs value then change orderBy', () => {
    expect(component.orderBy).toBe('flight_number');
    expect(component.orderByAsc).toBeTruthy();
    component.toggleLaunchOrderSorting('flight_number');
    expect(component.orderByAsc).toBeFalsy();
    component.toggleLaunchOrderSorting('launch_year');
    expect(component.orderBy).toBe('launch_year');
    expect(component.orderByAsc).toBeTruthy();
  });
  it('should return all launches', () => {
    expect(component.getLaunches().length).toBe(3);
  });
  it('should return launches sorted by flight_number in asc order', () => {
    const launches = component.getSortedLaunches();
    expect(launches[0].flight_number).toBe(1);
    expect(launches[2].flight_number).toBe(3);
    component.toggleLaunchOrderSorting('flight_number');
    fixture.detectChanges();
    expect(launches[2].flight_number).toBe(1);
    expect(launches[0].flight_number).toBe(3);
  });
  it('should return launches sorted by launch_year in desc order the asc', () => {
    component.orderBy = 'launch_year';
    fixture.detectChanges();
    component.toggleLaunchOrderSorting('launch_year');
    const launches = component.getSortedLaunches();
    expect(launches[0].launch_year).toBe('2014');
    expect(launches[2].launch_year).toBe('2012');
    component.toggleLaunchOrderSorting('launch_year');
    fixture.detectChanges();
    expect(launches[2].launch_year).toBe('2014');
    expect(launches[0].launch_year).toBe('2012');
  });
  it('should return launches sorted by rocket_name in desc order the asc', () => {
    component.orderBy = 'rocket_name';
    fixture.detectChanges();
    component.toggleLaunchOrderSorting('rocket_name');
    const launches = component.getSortedLaunches();
    expect(launches[0].rocket.rocket_name).toBe('flight 3');
    expect(launches[2].rocket.rocket_name).toBe('flight 1');
    component.toggleLaunchOrderSorting('rocket_name');
    fixture.detectChanges();
    expect(launches[2].rocket.rocket_name).toBe('flight 3');
    expect(launches[0].rocket.rocket_name).toBe('flight 1');
  });
});
