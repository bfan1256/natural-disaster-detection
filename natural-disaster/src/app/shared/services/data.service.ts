import { Search } from './../types/search.types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchUrl = '';
  found = false;
  results = [];

  constructor(private http: HttpClient, private router: Router) {
    this.searchUrl = environment.es_url;
  }

  /**
   * Searches ES instance given a query and a sort type
   * @param query Search string
   * @param sort_type Sort type to use
   */
  searchES(query, sortType = 'relevant') {
    return this.http.get(`${ this.searchUrl }/search?term=${ query }&sort_type=${ sortType }`).
      pipe(
        map((res: Search) => {
          console.log(res);
          this.results = res.result;
          this.found = res.result.length > 0;
          return this.results;
        })
      );
  }

  getTweetByID(index) {
    return this.results[index];
  }

  getEventTweets(topic): Observable<any[]> {
    return this.http.get(`${this.searchUrl}/tweets?topic=${topic}`)
      .pipe(
        map((res: Search) => {
          return res.result;
        })
      );
  }

  getEvents() {
    return this.http.get(`${this.searchUrl}/events`)
      .pipe(
        map((res: Search) => {
          return res.result;
        })
      );
  }

  getEvent(topic) {
    return this.http.get(`${this.searchUrl}/event?topic=${topic}`)
      .pipe(
        map((res: Search) => {
          return res.result[0];
        })
      );
  }
}
