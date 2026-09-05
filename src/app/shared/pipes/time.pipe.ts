import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  //input time in ms, return HH:MM:SS.ds
  transform(value: number): string {
    return this.msToTime(value);
  }

  private msToTime(duration) {
    let prec = Math.floor((duration % 1000) / 100);
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const hrs = (hours < 10) ? '0' + hours : hours;
    const mins = (minutes < 10) ? '0' + minutes : minutes;
    const secs = (seconds < 10) ? '0' + seconds : seconds;
    return `${hrs}:${mins}:${secs}.${prec}`;
  }
}
