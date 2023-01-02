import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CultureComponent } from './culture/culture.component';
import { FestivalComponent } from './festival/festival.component';
import { FoodComponent } from './food/food.component';
import { HomeComponent } from './home/home.component';
import { PlaceComponent } from './place/place.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "culture", component: CultureComponent },
  { path: "food", component: FoodComponent },
  { path: "place", component: PlaceComponent },
  { path: "festival", component: FestivalComponent },
  { path: "", redirectTo: "/home", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
