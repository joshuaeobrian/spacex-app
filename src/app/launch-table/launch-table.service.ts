import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Launch} from './launch-table.model';

@Injectable()
export class LaunchTableService {

  constructor(private http: HttpClient) {
  }

  /**
   * @description gets all launches from spaceX api
   */
  getLaunches(): Promise<Launch[]> {
    return this.http.get('https://api.spacexdata.com/v3/launches')
      .toPromise()
      .then(response => response as Launch[]);
  }
}
