import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import eslocale from '@angular/common/locales/es-MX'
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

registerLocaleData(eslocale);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es_MX'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
