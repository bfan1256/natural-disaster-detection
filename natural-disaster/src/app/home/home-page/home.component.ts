import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Event } from './../../shared/types/search.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  events = [];
  mostTweetsIndex = 0;


  constructor(private data: DataService, private router: Router) {
    this.data.getEvents().subscribe((events) => {
      this.events = events;
      this.events.sort(this.sortEventsByYear);
      this.findMostTweetsIndex();
    });
  }

  private findMostTweetsIndex() {
    this.events.forEach((event: Event, index: number) => {
      if (event.num_of_tweets > this.events[this.mostTweetsIndex].num_of_tweets) {
        this.mostTweetsIndex = index;
      }
    });
    return this.mostTweetsIndex;
  }

  private sortEventsByYear(event1: Event, event2: Event) {
    const year1 = parseInt(event1.title.slice(0, 5), 10);
    const year2 = parseInt(event2.title.slice(0, 5), 10);
    if (year1 < year2) {
      return 1;
    } else if (year1 > year2) {
      return -1;
    }
    return 0;
  }

  ngOnInit() {
    this.myStyle = {
        position: 'absolute',
        width: '100%',
        height: '50vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    this.myParams = {
        particles: {
            number: {
                value: 75,
            },
            color: {
                value: '#C1C1C1'
            },
            shape: {
                type: 'circle',
            },
    }
    };
  }

  query(searchString: string) {
    this.router.navigateByUrl(`/search?query=${searchString}`);
  }

  exploreEvent(topic: string) {
    this.router.navigateByUrl(`/event/${topic}`);
  }

}
