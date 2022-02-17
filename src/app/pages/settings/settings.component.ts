import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigSettings } from 'src/app/shared/interfaces/config.settings';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  private gameTime: number;
  private increment: number;

  constructor(private router: Router, private settings: SettingsService) {}

  clickHome() {
    this.router.navigate(['/']);
  }

  clickSubmitTime(form: NgForm) {
    const { userInput } = form.value;
    console.log(form.value.userInput);
    const settings: ConfigSettings = {
      duration: userInput,
      increment: userInput,
    };
    this.settings.setConfig(settings);
    // return this.userInput = this.value;
  }

  minute() {
    //minute to millisecond
    return this.gameTime * 60 * 1000;
  }

  second() {
    return this.increment * 1000; //second to millisecond
  }

  clickTimeThree() {
    this.gameTime = 3;
  }

  clickTimeFive() {
    this.gameTime = 5;
  }

  clickTimeTen() {
    this.gameTime = 10;
  }

  clickTimeCustom() {}

  clickIncZero() {}

  clickIncOne() {}

  clickIncThree() {}

  clickIncCustom() {}
}
