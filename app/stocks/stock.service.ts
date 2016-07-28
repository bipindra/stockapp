import{ Injectable} from '@angular/core'
import{ IStock } from './stock'
import {Http,Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StockService{

    constructor(private _http:Http){

    }
    getStocks(symbol:string): Observable<IStockQL>{
        var selectionCols="symbol,Bid,Change,LastTradeDate,ChangeinPercent,Name";
        var url= 'https://query.yahooapis.com/v1/public/yql?q=select%20'
        +selectionCols
        + '%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(\"'
        +symbol
        +'\")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

        return this._http.get(url)
        .map((response:Response)=>(<IStockQL>response.json()))
        .do(data=>console.log(JSON.stringify(data)))
        .catch(this.handleError);
    };
     handleError(error:Response){
        console.log('error occured'+error.toString());
        return Observable.throw(error.json().error);
    };
}

export interface IStockQL{
     query:IStockQLResponse;

}
export interface IStockQLResponse{
     results:IStockQuote;
}
export interface IStockQuote{
    quote:IStock[];
}

