import { Injectable } from '@angular/core';
import { CapPlatformService } from './cap-platform.service';
import { CapStorageService } from './cap-storage.service';

export type StorageKey = 'config';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public readonly KEYS = {
    CONFIG: 'config' as StorageKey,
  }

  constructor(private capPlatformService: CapPlatformService, private capStorageService: CapStorageService) {}

  async get(key: StorageKey) {
    const storageKey = this.formatAppStorageKey(key);
    if (this.capPlatformService.isNative) {
      const result = await this.capStorageService.get(storageKey);
      return result.value;
    }
    return localStorage.getItem(storageKey);
  }

  async set(key: StorageKey, value: any) {
    try {
      if (!!value) {
        const storageKey = this.formatAppStorageKey(key);
        const storedValue = JSON.stringify(value);
        console.log('Setting sotrage', storageKey, storedValue);
        if (this.capPlatformService.isNative) {
          return this.capStorageService.set(storageKey, storedValue);
        } else {
          localStorage.setItem(storageKey, storedValue);
        }
      }
    } catch (error) {
      console.error('set errror', error);
    }
  }

  async setString(key: StorageKey, value: string) {
    if (!!value) {
      const storageKey = this.formatAppStorageKey(key);
      if (this.capPlatformService.isNative) {
        return this.capStorageService.set(storageKey, value);
      } else {
        localStorage.setItem(storageKey, value);
      }
    }
  }

  async remove(key: StorageKey) {
    const storageKey = this.formatAppStorageKey(key);
    if (this.capPlatformService.isNative) {
      return this.capStorageService.remove(storageKey);
    }
    localStorage.removeItem(storageKey);
  }

  private formatAppStorageKey(key: StorageKey) {
    return `chessclock.settings.${key}`;
  }
}
