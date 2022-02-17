import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

export const PLATFORMS = {
  IOS: 'ios',
  WEB: 'web',
  ANDROID: 'android'
}

@Injectable({
  providedIn: 'root'
})
export class CapPlatformService {

  public get platform(): string {
    return Capacitor.getPlatform();
  }

  public get isNative(): boolean {
    return Capacitor.isNativePlatform();
  }
}
