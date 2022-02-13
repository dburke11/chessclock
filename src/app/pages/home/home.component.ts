import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from 'src/app/shared/services/timer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public turn: boolean = true;
  public playerOneTime: number = 60000; // 10 minutes
  public playerTwoTime: number = 60000;
  private timeInterval: Subscription;
  private preGame: boolean = true; //TODO yet to implement restart, this will control pre game state
  private gameOver: boolean = false;
  public readonly colors = {
    WHITE: 'WHITE',
    BLACK: 'BLACK',
  };
  public playerOne: string;
  public playerTwo: string;
  public currentPlayer: string;
  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.currentPlayer = this.colors.WHITE;
    this.playerOne = this.colors.WHITE;
    this.playerTwo = this.colors.BLACK;
  }

  ngOnDestroy(): void {
    this.stopClock();
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
    return this.currentPlayer !== player;
  }

  private startClock() {
    this.timeInterval = this.timerService
      .startInterval()
      .subscribe(() => this.clockLogic());
    this.preGame = false;
  }

  private clockLogic() {
    if (this.currentPlayer === this.playerOne) {
      this.playerOneTime -= this.timerService.INTERVAL_TIMER;
    } else {
      this.playerTwoTime -= this.timerService.INTERVAL_TIMER;
    }
    if (this.playerOneTime <= 0 || this.playerTwoTime <= 0) {
      this.stopClock();
    }
  }

  private stopClock() {
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
    }
    this.gameOver = true;
  }
}
