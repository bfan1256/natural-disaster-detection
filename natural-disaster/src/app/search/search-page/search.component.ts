import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  results = [];
  isLoading = true;
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.searchQuery = this.router.url.split('query=')[1];
    this.data.searchES(this.searchQuery).subscribe((res) => {
      timer(400).subscribe(() => this.isLoading = false);
      this.results = res;
    });
  }

  query(searchString: string) {
    this.isLoading = true;
    this.searchQuery = searchString;
    this.data.searchES(searchString).subscribe((res) => {
      timer(400).subscribe(() => this.isLoading = false);
      this.results = res;
    });
  }

  showQuery(searchString: string) {
    return searchString.replace(/%20/g, ' ');
  }
}
