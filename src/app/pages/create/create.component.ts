import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from '@models/alert.model';
import { AbstractComponent } from '@pages/abstract/abstract.component';
import { GameService } from '@services/game/game.service';
import { LoaderService } from '@services/loader/loader.service';
import { NotificationService } from '@services/notification/notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
/**
 * Create component
 */
export class CreateComponent extends AbstractComponent implements OnInit {

  newGameForm: FormGroup;

  error: string = null;

  alert: Alert = null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router,
    loaderService: LoaderService,
    private notifService: NotificationService
  ) {
    super(loaderService);
    this.alert = null;
  }

  ngOnInit() {

    // Init form
    this.newGameForm = this.fb.group({
      player1: [null, Validators.required],
      player2: [null, [Validators.required]]
    }, { validator: [this.playerNamesAreDifferents(this.notifService)] })
  }

  /**
   * Validate if players usernames are differents
   * @param control 
   */
  playerNamesAreDifferents(notifService: NotificationService): ValidatorFn {

    return (control: AbstractControl) => {
      const player1 = control.get('player1').value;
      const player2 = control.get('player2').value;
      const playerAreTheSame = player1 && player2 && player1 === player2;

      if (playerAreTheSame) {
        notifService.setError(null, 'Player usernames cannot be the same', 'warning');
        return { 'playerAreTheSame': true }
      }
      notifService.clearError();
      return null;
    }
  }

  onSubmit(): void {
    this.gameService.createGame(this.newGameForm.get('player1').value, this.newGameForm.get('player2').value)
      .subscribe(
        res => this.router.navigateByUrl(`/${res}`)
      )
  }

}
