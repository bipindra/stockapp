import { Component } from '@angular/core';
import { StockListComponent } from './stocks/stocklist.component';
import { StockService } from './stocks/stock.service';
import 'rxjs/Rx';
import { HTTP_PROVIDERS } from '@angular/http';
import {Observable} from 'rxjs/Observable';
 
@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [StockListComponent],
    providers: [StockService,HTTP_PROVIDERS]
}) 
export class AppComponent {
    pageTitle: string = 'Stocks Info';
} 