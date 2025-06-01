interface TradingViewWidgetOptions {
  container_id: string;
  autosize?: boolean;
  symbol?: string;
  interval?: string;
  timezone?: string;
  theme?: 'light' | 'dark';
  style?: string | number;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  hide_side_toolbar?: boolean;
}

interface TradingViewWidgetInstance {
  remove?: () => void;
}

interface TradingViewConstructor {
  new (options: TradingViewWidgetOptions): TradingViewWidgetInstance;
  widget(options: TradingViewWidgetOptions): TradingViewWidgetInstance;
}

interface TradingViewStatic {
  widget: TradingViewConstructor;
}

interface Window {
  TradingView?: TradingViewStatic;
}
