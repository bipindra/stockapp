//@require "./**/*.html" 
import { Component ,Input} from '@angular/core';
import { StockService} from './stock.service';
import { IStock,IStockQL } from './stock';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
    selector: 'stock-list',
    templateUrl: 'stocklist.component.html',
    directives: [StockListComponent,ROUTER_DIRECTIVES],
    providers: [StockService]

})
export class StockListComponent {

    constructor(private _service: StockService) {
        this.symbols = [];
        //this.loadSymbols();
    }
    pageTitle: string = 'Stock List';
    addSymbol(): void {
        for (let a of this.symbols) {
            if (a == this.inputSymbol)
                return;
        }
        var manySymbols = this.inputSymbol.split(',');
        for(let s of manySymbols){
            if(this.symbols.indexOf(s, 0)<0)
                this.symbols.push(s);
        }
        this.setSymbols();
        this.refresh();
        this.inputSymbol = "";
    }
    @Input('symbol')  inputSymbol: string = "";

    setSymbols(): void {
        window.localStorage["symbols"] = this.symbols;
    }
    loadSymbols(): void {
        var arr = window.localStorage["symbols"];
        arr = !arr?[]:arr;
        var newarr = arr instanceof Array ? arr : arr.split(",");
        this.symbols =  newarr || [];
        this.refresh();
    }
    symbols: string[];
    stocks: IStock[] = [];
    errorMessage: string;

    refresh(): void {
        //this.loadSymbols();
        if (this.symbols.length == 0) return;
        this._service.getStocks(this.symbols.join(","))
            .subscribe((stocks:IStockQL) => {
                if(stocks && stocks.query && stocks.query.results && stocks.query.results.quote)
                {
                    var quotes = new Array();
                    if( stocks.query.results.quote instanceof Array){
                        quotes = stocks.query.results.quote;
                    }
                    else{
                        quotes.push(stocks.query.results.quote);
                    }
                    
                    for (let stock of quotes) {
                        var newStock = stock;
                        var exists = false;
                        for (let item of this.stocks) {
                            if (item.symbol == newStock.symbol) {
                                exists = true;
                            }
                        }
                        if (!exists){
                            this.stocks.push(newStock);
                        }
                        
                    }
                }
            },
            (error:string) => this.errorMessage = <any>error);
    }

    remove(symbol: string): void {
        var symbolarray = this.symbols;
        var index = this.symbols.indexOf(symbol, 0);
        if (index > -1) {
            
            this.symbols.splice(index, 1);
            this.stocks.splice(index, 1);
        }
        this.setSymbols();
    }
    lastLoadedSymbols:string;
    intHandle:any;
    ngOnInit() {
        this.intHandle=setInterval(()=>{
            if(this.lastLoadedSymbols!=window.localStorage["symbols"]){
                this.lastLoadedSymbols = window.localStorage["symbols"];
                this.loadSymbols();
                this.refresh();
            }
        },2000);
    }

    ngOnDestroy() {
        clearInterval(this.intHandle);
    }

}