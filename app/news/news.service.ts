import {Injectable} from '@angular/core';
import {INewsProvider,YNewsProvider,GoogleNewsProvider} from './newsprovider';
import {NewsItem} from './newsitem';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class NewsService{
    constructor(private _http:Http){

    }
    newsProviders:INewsProvider[] = new Array<INewsProvider>();

    loadNewsProviders(){
        this.newsProviders.push(new YNewsProvider(this._http));
        this.newsProviders.push(new GoogleNewsProvider(this._http));
    }
    getNews(symbol:string): Observable<NewsItem[]>{
        this.loadNewsProviders();
        var newsItems = new Array<NewsItem>();
        for(let newsProvider of this.newsProviders){
            var news = newsProvider.GetNews(symbol);
            news.subscribe(items=>{
                    for(let newI of items){
                            newsItems.push(newI);
                        }
            });
            
        }
        
        return Observable.create((obs:any) =>{
            obs.next(newsItems);
            obs.complete();
        });
    }
}