import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigSettings } from 'src/app/shared/interfaces/config.settings';
import { Preset } from 'src/app/shared/interfaces/preset.settings';
import { SettingsService } from 'src/app/shared/services/settings.service';
import {
  CUSTOM_TIME_CONTROL_ID,
  PRESETS,
  TIMES,
} from '../../shared/constants/constants';
//TBI - duration and increment presets, dropdown or edit?  Edit current game timers to assess penalty

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public form: FormGroup;
  public compareWith;
  public presets: Preset[] = PRESETS;

  @ViewChild('s', { static: false }) select: any;

  constructor(private router: Router, private settings: SettingsService) {}

  async ngOnInit() {
    this.form = new FormGroup({
      hours: new FormControl(),
      minutes: new FormControl(),
      seconds: new FormControl(),
      increment: new FormControl(),
    });
    const config = await this.settings.getConfig();
    const formValues = {
      ...this.msToTime(config.duration),
      increment: this.incToSeconds(config.increment),
    };
    this.form.patchValue(formValues);
    const preset = this.presets.find(
      (p) => p.presetId === config.timeControlId
    );

    if (preset) {
      this.select.value = preset;
    }
  }

  public handleOnChange(preset: Preset) {
    const configSettings: ConfigSettings = {
      duration: preset.duration,
      increment: preset.increment,
      timeControlId: preset.presetId,
    };
    this.settings.setConfig(configSettings);
  }

  clickHome() {
    this.router.navigate(['/']);
  }

  clickSubmitTime() {
    if (!this.form.valid) {
      return alert('invalid value');
    }
    const { hours, minutes, seconds, increment } = this.form.value;
    const settings: ConfigSettings = {
      timeControlId: CUSTOM_TIME_CONTROL_ID,
      duration: this.durationToMS(hours, minutes, seconds),
      increment: this.incToMS(increment),
    };
    this.settings.setConfig(settings);
  }

  durationToMS(hours: number, minutes: number, seconds: number) {
    return (
      hours * TIMES.ONE_HOUR +
      minutes * TIMES.ONE_MINUTE +
      seconds * TIMES.ONE_SECOND
    );
  }

  private msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  incToMS(increment: number) {
    return increment * TIMES.ONE_SECOND;
  }

  incToSeconds(increment: number) {
    return increment / TIMES.ONE_SECOND;
  }
}
