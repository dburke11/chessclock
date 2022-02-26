import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigSettings } from '../interfaces/config.settings';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private storage: StorageService) {}

  private _config: ConfigSettings = null;
  private _defaultConfig: ConfigSettings = {
    duration: 1200000,
    increment: 1000,
  };

  public configSubject = new Subject<ConfigSettings>();

  public setConfig(config: ConfigSettings) {
    this._config = config;
    this.configSubject.next(config);
    this.storeConfig();
  }

  public async getConfig() {
    const res = await this.storage.get(this.storage.KEYS.CONFIG);
    this._config = JSON.parse(res);
    return this._config || this._defaultConfig;
  }

  private storeConfig() {
    this.storage.set(this.storage.KEYS.CONFIG, this._config);
  }
}
