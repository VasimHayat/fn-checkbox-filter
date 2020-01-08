import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FnCheckboxFilterModule } from './fn-checkbox-filter/fn-checkbox-filter.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FnCheckboxFilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
