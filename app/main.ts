import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';

import '../style.css';
import { appRouterProviders } from './app.routes';
import {LocationStrategy,  HashLocationStrategy} from '@angular/common'

if (process.env.ENV === 'production') {
  enableProdMode();
} 
bootstrap(AppComponent, [appRouterProviders]);

//@require "./**/*.html" 
