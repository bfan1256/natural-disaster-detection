import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {
  @Input() title = '';
  @Input() imageUrl = '';
  @Input() count = 0;
  @Input() isRecent = false;
  @Input() mostCount = false;
  @Input() type = '';

  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.clicked.emit(true);
  }

}
