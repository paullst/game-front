import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-abstract',
  templateUrl: './abstract.component.html',
  styleUrls: ['./abstract.component.scss']
})
export class AbstractComponent implements OnInit {

  loading = false;

  sub: Subscription;

  constructor(
    private loaderService: LoaderService
  ) {
    this.loaderService.loaderState.subscribe(loading => this.loading = loading);
  }

  ngOnInit() {
  }

}
