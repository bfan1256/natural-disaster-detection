import { SearchModule } from './../search/search.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsPageComponent } from './events-page/events-page.component';


@NgModule({
  declarations: [EventsPageComponent],
  imports: [
    CommonModule,
    SearchModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
