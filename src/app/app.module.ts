import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryService } from './service/country/country.service';
import { GameComponent } from './game/game.component';

// Bootstrap
import { NgbModule, NgbAlertModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { GameService } from './service/game/game.service';
import { MoveService } from './service/move/move.service';




@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule, // Bootstrap,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbModalModule
  ],
  providers: [CountryService, GameService, MoveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
