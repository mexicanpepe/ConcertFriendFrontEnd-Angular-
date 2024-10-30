import { Routes } from '@angular/router';
import { ListArtistsComponent } from './list-artists/list-artists.component'
import { ListConcertsComponent } from './list-concerts/list-concerts.component';
import { CreateConcertComponent } from './create-concert/create-concert.component';
import { EditConcertComponent } from './edit-concert/edit-concert.component';
import { DisplayConcertComponent } from './display-concert/display-concert.component';


export const routes: Routes = [
  { path: '', redirectTo: '/list-artists', pathMatch: 'full' },
  { path: 'list-artists', component: ListArtistsComponent },
  { path: 'list-concerts', component: ListConcertsComponent },
  { path: 'create-concert', component: CreateConcertComponent },
  { path: 'edit-concert/:id', component: EditConcertComponent },
  { path: 'display-concert/:id', component: DisplayConcertComponent },
];
