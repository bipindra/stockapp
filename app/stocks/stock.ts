

export interface IStockQL{
     query:IStockQLResponse;

}
export interface IStockQLResponse{
     results:IStockQuote;
}
export interface IStockQuote{
    quote:IStock[];
}


export interface IStock {
    symbol: string;
    Bid: number;
    LastTradeDate: string;
    Change: string;
    ChangeinPercent: string;
    Ask: string,
    AverageDailyVolume: string,
    AskRealtime: string,
    BidRealtime: string,
    BookValue: string,
    Change_PercentChange: string,
    Commission: string,
    Currency: string,
    ChangeRealtime: string,
    AfterHoursChangeRealtime: string,
    DividendShare: string,
    TradeDate: string,
    EarningsShare: string,
    ErrorIndicationreturnedforsymbolchangedinvalid: string,
    EPSEstimateCurrentYear: string,
    EPSEstimateNextYear: string,
    EPSEstimateNextQuarter: string,
    DaysLow: string,
    DaysHigh: string,
    YearLow: string,
    YearHigh: string,
    HoldingsGainPercent: string,
    AnnualizedGain: string,
    HoldingsGain: string,
    HoldingsGainPercentRealtime: string,
    HoldingsGainRealtime: string,
    MoreInfo: string,
    OrderBookRealtime: string,
    MarketCapitalization: string,
    MarketCapRealtime: string,
    EBITDA: string,
    ChangeFromYearLow: string,
    PercentChangeFromYearLow: string,
    LastTradeRealtimeWithTime: string,
    ChangePercentRealtime: string,
    ChangeFromYearHigh: string,
    PercebtChangeFromYearHigh: string,
    LastTradeWithTime: string,
    LastTradePriceOnly: string,
    HighLimit: string,
    LowLimit: string,
    DaysRange: string,
    DaysRangeRealtime: string,
    FiftydayMovingAverage: string,
    TwoHundreddayMovingAverage: string,
    ChangeFromTwoHundreddayMovingAverage: string,
    PercentChangeFromTwoHundreddayMovingAverage: string,
    ChangeFromFiftydayMovingAverage: string,
    PercentChangeFromFiftydayMovingAverage: string,
    Name: string,
    Notes: string,
    Open: string,
    PreviousClose: string,
    PricePaid: string,
    PriceSales: string,
    PriceBook: string,
    ExDividendDate: string,
    PERatio: string,
    DividendPayDate: string,
    PERatioRealtime: string,
    PEGRatio: string,
    PriceEPSEstimateCurrentYear: string,
    PriceEPSEstimateNextYear: string,
    Symbol: string,
    SharesOwned: string,
    ShortRatio: string,
    LastTradeTime: string,
    TickerTrend: string,
    OneyrTargetPrice: string,
    Volume: string,
    HoldingsValue: string,
    HoldingsValueRealtime: string,
    YearRange: string,
    DaysValueChange: string,
    DaysValueChangeRealtime: string,
    StockExchange: string,
    DividendYield: string,
    PercentChange: string
}
