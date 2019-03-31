import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { GameComponent } from './pages/game/game.component';
import { CountryRefResolver } from './resolvers/country-ref.resolver';
import { InitialStateResolver } from './resolvers/initial-state.resolver';

const routes: Routes = [
  { path: '', component: CreateComponent },
  { 
    path: ':id',
    component: GameComponent,
    resolve: {
      state: InitialStateResolver,
      ref: CountryRefResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
