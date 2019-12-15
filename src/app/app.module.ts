import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LaunchTableComponent } from './launch-table/launch-table.component';
import { TableRowComponent } from './launch-table/table-row/table-row.component';
import {LaunchTableService} from './launch-table/launch-table.service';

@NgModule({
  declarations: [
    AppComponent,
    LaunchTableComponent,
    TableRowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [LaunchTableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
