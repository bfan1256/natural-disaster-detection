import { Event } from './../../shared/types/search.types';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  topic = '';
  event: Event = null;
  isLoading = true;
  results = [];

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    const routes = this.router.url.split('/');
    this.topic = routes[routes.length - 1];
    this.data.getEvent(this.topic).subscribe((event) => {
      this.event = event as Event;
    });

    this.data.getEventTweets(this.topic).subscribe((res) => {
      timer(400).subscribe(() => this.isLoading = false);
      this.results = res;
    });
  }

  getImage() {
    if (this.event !== null) {
      return `url(${this.event.imageUrl}) no-repeat center`;
    }
  }

  checkIrrelevancy(labels) {
    console.log(labels);
    const lowerCaseLabels = labels.map(label => label.toLowerCase());
    return lowerCaseLabels.indexOf('irrelevant') !== -1;
  }



}
