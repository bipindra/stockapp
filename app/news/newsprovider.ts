import {NewsItem} from './newsitem';

import {Http,Response } from '@angular/http';

export interface INewsProvider{
    GetNews(symbol:string):Observable<NewsItem[]>;
}

import {Observable} from 'rxjs/Observable';
export class BaseNewsProvider{
    url:string;
    provider:string;
    constructor(protected _http:Http){
        this.url = "https://query.yahooapis.com/v1/public/yql?q=select * from feednormalizer where url=\"{0}\"&format=json"; //proxy url
    }

    GetNews(symbol:string):Observable<NewsItem[]>{
        var newsItems = new Array<NewsItem>();
        var url = this.url.replace("XXXXX",symbol);
        console.log(url);
        return this._http.get(url)
        .map((response:Response)=>{
            console.log(response.text());
            var list = (response.json());
            for(let i of list.query.results.rss.channel.item){
                var newItem = new NewsItem();
                newItem.Provider = this.provider;
                newItem.Title = i.title;
                newItem.Description = i.description;
                newItem.Link = i.link;
                newItem.PubDate = i.pubdate;
                newsItems.push(newItem);
            }
             return newsItems;
            })
        .do((data:any)=>console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

    handleError(error:Response):Observable<any>{
        console.log('error occured'+error.toString());
        return Observable.throw(error.json().error);
    }

    setUrl(apiUrl:string){
        this.url=this.url.replace('{0}',encodeURIComponent(apiUrl));
    }
}

export class YNewsProvider extends BaseNewsProvider implements INewsProvider{
    
    constructor(protected _http:Http){
        super(_http);
        this.provider="Y";
        this.setUrl("http://finance.yahoo.com/rss/headline?s=XXXXX");
 }
}

export class GoogleNewsProvider extends BaseNewsProvider  implements INewsProvider{

    constructor(protected _http:Http){
        super(_http);
        this.provider="G"
        this.setUrl("https://www.google.com/finance/company_news?q=NASDAQ:XXXXX&output=rss");
    }
}
