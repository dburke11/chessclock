import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public readonly INTERVAL_TIMER: number = 100; // How often the chess clock ticks
  private readonly PAUSE_TIMER: number = 500; // flashing pause indication
  public startInterval() {
    return interval(this.INTERVAL_TIMER);
  }
  public pauseInterval() {
    return interval(this.PAUSE_TIMER)
  }
}
