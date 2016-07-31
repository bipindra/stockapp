import {Component} from '@angular/core'
import { ActivatedRoute, Router, ROUTER_DIRECTIVES }  from '@angular/router';
import {StockService} from './stock.service';
import {IStock,IStockQL} from './stock';
import {NewsListComponent} from '../news/newslist.component';
@Component({
    templateUrl: 'stock-details.component.html',
    directives: [ROUTER_DIRECTIVES,NewsListComponent],
     providers: [StockService]
})
export class StockDetailsComponent {
    private sub: any;
    constructor(private _service: StockService,private route: ActivatedRoute) {
        
    }
    Symbol: string;
    Name : string;
    Description: string;
    ErrorMessage:string;
    StockInfo:IStock[] = [];

    ngOnInit() {
        this.Description = "";
       this.sub = this.route
            .params
            .subscribe(params => {
                var param = params['id'];
                this.Symbol = param;
                
            });
    }

    ngAfterContentInit(){
        
        this._service.getStocksDetails(this.Symbol)
            .subscribe((stocks:IStockQL) => {
                if(stocks && stocks.query && stocks.query.results && stocks.query.results.quote)
                {
                    var quotes = new Array<any>();
                    if( stocks.query.results.quote instanceof Array){
                        quotes = stocks.query.results.quote;
                    }
                    else{
                        quotes.push(stocks.query.results.quote);
                    }
                    
                    for (let stock of quotes) {
                        var newStock = stock;
                        var exists = false;
                        for (let item of this.StockInfo) {
                            if (item.symbol == newStock.symbol) {
                                exists = true;
                            }
                        }
                        if (!exists){
                            this.Name = newStock.Name;
                            this.Description = this.Description + newStock.Name;
                        }
                        
                    }
                }
            },
            (error:string) => this.ErrorMessage = <any>error);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}