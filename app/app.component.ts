import { Component } from '@angular/core';
import { StockListComponent } from './stocks/stocklist.component';
import { StockService } from './stocks/stock.service';
import 'rxjs/Rx';
import { HTTP_PROVIDERS } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import {NewsListComponent} from './news/newslist.component';
import {NewsService} from './news/news.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [StockListComponent,NewsListComponent,ROUTER_DIRECTIVES],
    providers: [StockService,NewsService,HTTP_PROVIDERS]
}) 
export class AppComponent {
    pageTitle: string = 'Stocks Info';
} 