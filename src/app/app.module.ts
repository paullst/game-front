import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './pages/game/game.component';

import { NgbModule, NgbAlertModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './pages/create/create.component';
import { GameService } from './services/game/game.service';
import { MoveService } from './services/move/move.service';
import { CountryRefResolver } from './resolvers/country-ref.resolver';
import { InitialStateResolver } from './resolvers/initial-state.resolver';
import { LoaderService } from './services/loader/loader.service';
import { AbstractComponent } from './pages/abstract/abstract.component';
import { LoaderInterceptorService } from './interceptors/loader/loader-interceptor.service';
import { NotificationService } from './services/notification/notification.service';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CreateComponent,
    AbstractComponent,
    NotificationComponent
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
  providers: [
    GameService,
    MoveService,
    CountryRefResolver,
    InitialStateResolver,
    LoaderService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
