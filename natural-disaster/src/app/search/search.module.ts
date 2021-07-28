import { SearchRoutingModule } from './search.routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search-page/search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchCardComponent } from './components/search-card/search-card.component';
import { TweetCardComponent } from './tweet-card/tweet-card.component';



@NgModule({
  declarations: [SearchComponent, SearchBarComponent, SearchCardComponent, TweetCardComponent],
  imports: [
    SearchRoutingModule,
    FormsModule,
    CommonModule
  ],
  exports: [SearchRoutingModule, SearchBarComponent, SearchCardComponent, TweetCardComponent],
  entryComponents: [SearchComponent, SearchBarComponent, SearchCardComponent, TweetCardComponent]
})
export class SearchModule { }
