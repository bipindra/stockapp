import{ Pipe,Component,Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NewsService} from './news.service';
import {NewsItem} from './newsitem';
@Component({
    selector:'news-list',
    templateUrl:'newslist.component.html'
})


@Pipe({
  name: "orderby"
})
export class NewsListComponent{

    Items : NewsItem[];
    constructor(private _newsService:NewsService){
        this.Items = [];
    }

    ngOnInit() {
        var newsSubscribable = this._newsService.getNews(this.Symbol);
        console.log('ok' + newsSubscribable);
        if(newsSubscribable!=null){
            newsSubscribable.subscribe(a=>this.Items =a);
        }
    }

    @Input('symbol') Symbol:string;
    @Input('name') Name:string;

}