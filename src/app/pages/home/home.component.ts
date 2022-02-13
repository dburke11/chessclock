import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TimerService } from 'src/app/shared/services/timer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public turn: boolean = true;
  private gameTime: number = 10 * 1000; // 10 minutes
  public playerOneTime: number; 
  public playerTwoTime: number;
  private timeInterval: Subscription;
  public preGame: boolean = true; //TODO yet to implement restart, this will control pre game state
  public gameOver: boolean = false;
  public isPaused: boolean = false;
  public readonly colors = {
    WHITE: 'WHITE',
    BLACK: 'BLACK',
  };
  public playerOne: string;
  public playerTwo: string;
  public currentPlayer: string;
  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.playerOne = this.colors.WHITE;
    this.playerTwo = this.colors.BLACK;
    this.restartGame();
  }

  ngOnDestroy(): void {
    this.stopClock();
  }

  public pauseGame() {
    if (this.isPaused) {
      this.startClock();
    } else {
      this.stopClock();
    }
    this.isPaused = !this.isPaused;
  }

  public restartGame() {
    this.preGame = true;
    this.currentPlayer = this.colors.WHITE;
    this.stopClock();
    this.playerOneTime = this.gameTime;
    this.playerTwoTime = this.gameTime;
    this.gameOver = false;
    this.isPaused = false;
  }

  public boardSwap() {
    if (this.preGame || this.gameOver) {
      const temp = this.playerOne;
      this.playerOne = this.playerTwo;
      this.playerTwo = temp;
    }
  }

  public handleOnClick(player: string) {
    console.log(player);
    this.currentPlayer =
      player === this.colors.WHITE ? this.colors.BLACK : this.colors.WHITE;
    if (!this.timeInterval) {
      this.startClock();
    }
  }

  public isPlayerDisabled(player: string) {
    return this.isPaused || this.currentPlayer !== player;
  }

  private startClock() {
    this.timeInterval = this.timerService
      .startInterval()
      .subscribe(() => this.clockLogic());
    this.preGame = false;
  }

  public onSettingsClick() { // TBI
    return null;
  }

  private clockLogic() {
    if (this.currentPlayer === this.playerOne) {
      this.playerOneTime -= this.timerService.INTERVAL_TIMER;
    } else {
      this.playerTwoTime -= this.timerService.INTERVAL_TIMER;
    }
    if (this.playerOneTime <= 0 || this.playerTwoTime <= 0) {
      this.stopClock();
      this.gameOver = true;
    }
  }

  private stopClock() {
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
      this.timeInterval = null;
    }
  }
}
