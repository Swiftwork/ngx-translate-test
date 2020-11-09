import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child.component';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

const translation = { test2: 'Child translation' };

class CustomLoader implements TranslateLoader {
  getTranslation(): Observable<any> {
    console.log('child');
    return of(translation);
  }
}

export class DefaultTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    console.log('missing');
    const key: keyof typeof translation = params.key as any;
    return params.translateService.parser.interpolate(
      translation[key],
      params.interpolateParams
    );
  }
}

@NgModule({
  declarations: [ChildComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useClass: CustomLoader },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: DefaultTranslationHandler,
      },
      useDefaultLang: true,
      isolate: false,
    }),
  ],
  exports: [ChildComponent],
})
export class ChildModule {}
