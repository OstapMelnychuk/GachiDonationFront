import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonationPageComponent } from './donation-page/donation-page.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService, TranslateLoader, TranslateStore } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DonationPageComponent],
  providers: [
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    TranslateService,
    TranslateStore // Provide TranslateStore to resolve NullInjectorError
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GachiDonationFront';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ua', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang); // Switch the active language dynamically
  }
}
