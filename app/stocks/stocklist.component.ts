//@require "./**/*.html" 
import { Component } from '@angular/core';
import { StockService} from './stock.service';
import { IStock } from './stock';

@Component({
    selector: 'stock-list',
    templateUrl: 'stocklist.component.html',
    providers: [StockService]

})
export class StockListComponent {

    constructor(private _service: StockService) {
        this.symbols = [];
        this.loadSymbols();
    }
    pageTitle: string = 'Stock List';
    addSymbol(): void {
        for (let a of this.symbols) {
            if (a == this.inputSymbol)
                return;
        }
        this.symbols.push(this.inputSymbol);
        this.setSymbols();
        this.refresh();

    }
    inputSymbol: string = "";

    setSymbols(): void {
        window.localStorage["symbols"] = this.symbols;
    }
    loadSymbols(): void {
        var arr = window.localStorage["symbols"];
        arr = !arr?"":arr;
        var newarr = arr instanceof Array ? arr : arr.split(",");
   
        this.symbols =  newarr || [];
        this.refresh();
    }
    symbols: string[];
    stocks: IStock[] = [];
    errorMessage: string;

    refresh(): void {
        if (this.symbols.length == 0) return;
        this._service.getStocks(this.symbols.join(","))
            .subscribe((stocks) => {
                for (let stock of stocks.query.results.quote) {
                    var newStock = stock;
                    var exists = false;
                    for (let item of this.stocks) {
                        if (item.symbol == newStock.symbol) {
                            exists = true;
                        }
                    }
                    if (!exists)
                        this.stocks.push(newStock);
                }
            },
            error => this.errorMessage = <any>error);
    }

    remove(symbol: string): void {
        var index = this.symbols.indexOf(symbol, 0);
        if (index > -1) {
            this.symbols.splice(index, 1);
            this.stocks.splice(index, 1);
        }
        this.setSymbols();
    }
}