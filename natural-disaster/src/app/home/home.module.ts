import { ParticlesModule } from 'angular-particle';
import { SearchModule } from './../search/search.module';
import { HomeRoutingModule } from './home.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home-page/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SearchModule,
    ParticlesModule
  ],
  exports: [HomeRoutingModule],
  entryComponents: [HomeComponent]
})
export class HomeModule { }
