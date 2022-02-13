import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TimePipe } from 'src/app/shared/pipes/time.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    TimePipe
  ]
})

export class HomeComponent implements OnInit, OnDestroy {
  public turn: boolean = true;
  public playerOneTime: number = 600000; // 10 minutes
  public playerTwoTime: number = 600000;
  private timeInterval = null;
  constructor() { }

  ngOnInit() {
    this.timeInterval = setInterval(() => {
      if (this.turn) {
        this.playerOneTime -= 100;
      } else {
        this.playerTwoTime -= 100;
      }
    }, 100);
  }
  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
  public handleOnClick(value: string) {
    this.turn = !this.turn;
    console.log(value);
  }
}
