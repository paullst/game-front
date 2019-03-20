import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GameService } from '@app/service/game/game.service';
import { Router } from '@angular/router';
import { Alert } from '@app/model/alert.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
/**
 * Create component
 */
export class CreateComponent implements OnInit {

  newGameForm: FormGroup;

  loading = false;
  error: string = null;

  alert: Alert = null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
    this.alert = null;
  }

  ngOnInit() {

    // Init form
    this.newGameForm = this.fb.group({
      player1: [null, Validators.required],
      player2: [null, [Validators.required]]
    },{ validator: [this.playerNamesAreDifferents]})
  }

  /**
   * Validate if players usernames are differents
   * @param control 
   */
  playerNamesAreDifferents(control: AbstractControl) {

    const playerAreTheSame = control.get('player1').value === control.get('player2').value;
      return playerAreTheSame ? {'playerAreTheSame': true} : null;
  }



  onSubmit(): void {
    this.loading = true;
    this.gameService.createGame(this.newGameForm.get('player1').value, this.newGameForm.get('player2').value)
      .subscribe(
        res => this.router.navigateByUrl(`/${res}`),
        err => {
          this.error = err;
          this.loading = false;
        }
      )
  }

}
