import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {LaunchTableComponent} from './launch-table/launch-table.component';
import {TableRowComponent} from './launch-table/table-row/table-row.component';
import {LaunchTableService} from './launch-table/launch-table.service';
import {HttpClientModule} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [LaunchTableService],
      declarations: [
        AppComponent, LaunchTableComponent, TableRowComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'spacex-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('spacex-app');
  });
});
