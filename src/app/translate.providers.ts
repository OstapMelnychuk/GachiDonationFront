import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export function provideTranslateModule(httpLoaderFactory: (http: HttpClient) => TranslateLoader): EnvironmentProviders {
  return importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  );
}
