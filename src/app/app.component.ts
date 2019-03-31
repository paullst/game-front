import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader/loader.service';
import { NotificationService } from './services/notification/notification.service';
import { Notification } from '@models/notification.model';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'game';

  loading = false;
  notif: Notification = null;

  subLoader: Subscription;
  subNotif: Subscription;


  constructor(
    private loaderService: LoaderService,
    private notifService: NotificationService
  ) {
  }

  ngOnInit() {

    // Loader
    this.subLoader = this.loaderService.loaderState
      .subscribe(
        loading => {
          this.loading = loading;
        }
      );

    // Notification
    this.subNotif = this.notifService.notif
      .subscribe(
        notif => {
          console.log('notif', notif);
          this.notif = notif;
        }
      );

  }

  ngOnDestroy() {
    this.subLoader.unsubscribe();
    this.subNotif.unsubscribe();
  }

}
