import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CultureComponent } from './culture/culture.component';
import { FoodComponent } from './food/food.component';
import { PlaceComponent } from './place/place.component';
import { FestivalComponent } from './festival/festival.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CultureComponent,
    FoodComponent,
    PlaceComponent,
    FestivalComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
