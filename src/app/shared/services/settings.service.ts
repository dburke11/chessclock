import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigSettings } from '../interfaces/config.settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _config: ConfigSettings = { duration: 600000, increment: 5000 };
  public configSubject = new Subject<ConfigSettings>();
  public setConfig(config: ConfigSettings) {
    this._config = config;
    this.configSubject.next(config);
  }

  public getConfig() {
    return this._config;
  }
}
