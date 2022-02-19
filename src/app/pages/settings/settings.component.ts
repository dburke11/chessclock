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
  constructor(private router: Router, private settings: SettingsService) {}

  clickHome() {
    this.router.navigate(['/']);
  }

  clickSubmitTime(form: NgForm) {
    const { duration, increment } = form.value;
    const settings: ConfigSettings = {
      duration,
      increment,
    };
    this.settings.setConfig(settings);
  }

  clickTimeThree() {}

  clickTimeFive() {}

  clickTimeTen() {}

  clickTimeCustom() {}

  clickIncZero() {}

  clickIncOne() {}

  clickIncThree() {}

  clickIncCustom() {}
}
