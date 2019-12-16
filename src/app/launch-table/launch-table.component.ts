import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Launch, Rocket} from './launch-table.model';
import {LaunchTableService} from './launch-table.service';

@Component({
  selector: 'app-launch-table',
  templateUrl: './launch-table.component.html',
  styleUrls: ['./launch-table.component.scss']
})
export class LaunchTableComponent implements OnInit {
  title = 'SpaceX Launches';
  orderBy = 'flight_number';
  orderByAsc = true;
  launches: Launch[] = [];
  itemsPerPage = 10;
  startIndex = 0;
  page = 0;
  pages = 0;

  constructor(private launchTableService: LaunchTableService) {
  }

  /**
   * @description when component initializes we query for all the launches from SpaceX Api
   * then set the necessary properties
   */
  ngOnInit() {
    this.launchTableService.getLaunches()
      .then(launches => this.setLaunchTableData(launches));
  }

  /**
   * @description takes an array of Launches and sets them along with how many pages.
   */
  setLaunchTableData(launches: Launch[]) {
    this.launches = launches || [];
    this.pages = Math.ceil(launches.length / this.itemsPerPage);
    this.page = this.pages >= 1 ? 1 : 0;
  }

  /**
   * @description updates the values of how launches are being sorted
   * if the column is being clicked for the first time we default orderByAsc to true
   * else we toggle the existing value
   */
  toggleLaunchOrderSorting(orderBy: 'flight_number' | 'launch_year' | 'rocket_name'): void {
    this.orderByAsc = this.orderBy === orderBy ? !this.orderByAsc : true;
    this.orderBy = orderBy;
  }

  /**
   * @description takes two Rocket items and compares the name then return 1, -1, 0 depending on the value
   */
  rocketSortOrder(rocket1: Rocket, rocket2: Rocket) {
    if (rocket1.rocket_name <= rocket2.rocket_name) {
      return 1;
    } else if (rocket1.rocket_name >= rocket2.rocket_name) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * @description sorts all launches by selected column by asc or desc depending on orderByAsc Value
   */
  getSortedLaunches(): Launch[] {
    const orderBy = this.orderBy;
    return this.launches.sort((current, next) => {
      if (orderBy === 'rocket_name') {
        let order;
        if (!this.orderByAsc) {
          order = this.rocketSortOrder(current.rocket, next.rocket);
        } else {
          order = this.rocketSortOrder(next.rocket, current.rocket);
        }
        return order;
      } else {
        if (!this.orderByAsc) {
          return next[orderBy] - current[orderBy];
        }
        return current[orderBy] - next[orderBy];
      }
    });
  }

  /**
   * @description sorts all of the launches by selected filter then returns a section of Launches given the page the user is on
   */
  getLaunches(): Launch[] {
    return this.getSortedLaunches().slice(this.startIndex, this.startIndex + this.itemsPerPage);
  }

  /**
   * @description controls the capability of going back a page
   * if the user clicks the Prev Button we then decrement the page by 1 and then increment the startIndex by the value of itemsPerPage
   */
  onPreviousClick() {
    this.page -= 1;
    this.startIndex -= this.itemsPerPage;
  }

  /**
   * @description controls the capability of going forward a page,
   * if the user clicks the Next button we then increment the page by 1 and then increment the startIndex by the value of itemsPerPage
   */
  onNextClick() {
    this.page += 1;
    this.startIndex += this.itemsPerPage;
  }

}
