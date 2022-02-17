import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigSettings } from 'src/app/shared/interfaces/config.settings';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { TimerService } from 'src/app/shared/services/timer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public turn: boolean = true;
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
  private config: ConfigSettings = null;
  private configSubscription: Subscription = null;
  constructor(
    private timerService: TimerService,
    private router: Router,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    console.log('init');
    this.config = this.settings.getConfig();
    this.configSubscription = this.settings.configSubject.subscribe(
      (config) => {
        this.config = config;
        this.restartGame();
        console.log('config emmitted', config);
      }
    );
    this.playerOne = this.colors.WHITE;
    this.playerTwo = this.colors.BLACK;
    this.restartGame();
  }

  ngOnDestroy(): void {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
    console.log('destroy');
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
    this.playerOneTime = this.config.duration;
    this.playerTwoTime = this.config.duration;
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
    if (player === this.playerOne){
      this.playerOneTime += this.config.increment;
    } else {
      this.playerTwoTime += this.config.increment;
    }
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

  public onSettingsClick() {
    // TBI
    this.stopClock();
    this.isPaused = true;
    this.router.navigate(['settings']);
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
