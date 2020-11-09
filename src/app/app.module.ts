import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AppComponent } from './app.component';
import { ChildModule } from './child/child.module';

class CustomLoader implements TranslateLoader {
  getTranslation(): Observable<any> {
    console.log('parent');
    return of({ test1: 'Parent translation' }).pipe(delay(0));
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: CustomLoader },
    }),
    ChildModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
