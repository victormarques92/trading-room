declare global {
  interface Window {
    TradingView: {
      widget: new (
        options: TradingViewWidgetOptions,
      ) => TradingViewWidgetInstance;
    };
  }
}

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
  onReady?: () => void;
  onChartReady?: () => void;
}

interface TradingViewChart {
  createShape: (
    position: { time: number },
    options: {
      shape: 'arrow_up' | 'arrow_down';
      text: string;
      overrides: {
        color: string;
        textColor: string;
        fontSize: number;
      };
    },
  ) => void;
  removeAllShapes: () => void;
}

interface TradingViewWidgetInstance {
  onChartReady: (callback: () => void) => void;
  activeChart: () => TradingViewChart;
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
