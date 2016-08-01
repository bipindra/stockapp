import { provideRouter, RouterConfig } from '@angular/router';
import {StockListComponent} from './stocks/stocklist.component';
import {StockDetailsComponent} from './stocks/stock-details.component';


const routes: RouterConfig = [
  { path: '', component: StockListComponent },
  { path: 'stocks', component: StockListComponent },
  { path: 'stocks-details/:id', component: StockDetailsComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];