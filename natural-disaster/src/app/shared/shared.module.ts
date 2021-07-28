import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [FooterComponent, LoadingComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [FooterComponent, LoadingComponent],
  entryComponents: [FooterComponent, LoadingComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ DataService ]
    };
  }
}
