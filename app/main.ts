import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';
import 'bootstrap/dist/css/bootstrap.css';

if (process.env.ENV === 'production') {
  enableProdMode();
} 
bootstrap(AppComponent, []);

//@require "./**/*.html" 
