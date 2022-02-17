import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public readonly INTERVAL_TIMER: number = 100; // How often the chess clock ticks

  public startInterval() {
    return interval(this.INTERVAL_TIMER);
  }
}
