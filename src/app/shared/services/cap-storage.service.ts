import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class CapStorageService {

  public get(key: string) {
    return Storage.get({ key });
  }

  public set(key: string, value: any) {
    return Storage.set({
      key,
      value
    });
  }

  public remove(key: string) {
    return Storage.remove({ key });
  }
}
