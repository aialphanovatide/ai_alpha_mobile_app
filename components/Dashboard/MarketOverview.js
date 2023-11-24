import React, { useEffect } from "react";

const MarketOverview = ({width, height}) => {
  useEffect(() => {
    return () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
      script.innerHTML = JSON.stringify({
        colorTheme: "dark",
        dateRange: "12M",
        showChart: true,
        locale: "en",
        largeChartUrl: "",
        isTransparent: false,
        showSymbolLogo: true,
        showFloatingTooltip: true,
        width: width,
        height: height,
        plotLineColorGrowing: "rgba(255, 133, 34, 1)",
        plotLineColorFalling: "rgba(255, 133, 34, 1)",
        gridLineColor: "rgba(240, 243, 250, 0)",
        scaleFontColor: "rgba(106, 109, 120, 1)",
        belowLineFillColorGrowing: "rgba(255, 152, 0, 0.64)",
        belowLineFillColorFalling: "rgba(255, 152, 0, 0.6)",
        belowLineFillColorGrowingBottom: "rgba(249, 203, 156, 0.51)",
        belowLineFillColorFallingBottom: "rgba(255, 152, 0, 0.24)",
        symbolActiveColor: "rgba(80, 80, 80, 0.50)",
        tabs: [
          {
            title: "Indices",
            symbols: [
              {
                s: "FOREXCOM:SPXUSD",
                d: "S&P 500",
              },
              {
                s: "FOREXCOM:NSXUSD",
                d: "US 100",
              },
              {
                s: "FOREXCOM:DJI",
                d: "Dow 30",
              },
              {
                s: "INDEX:NKY",
                d: "Nikkei 225",
              },
              {
                s: "INDEX:DEU40",
                d: "DAX Index",
              },
              {
                s: "FOREXCOM:UKXGBP",
                d: "UK 100",
              },
              {
                s: "BINANCE:BTCUSDT",
                d: "BTCUSDT",
              },
              {
                s: "FOREXCOM:USDCHF",
                d: "USD / CHF",
              },
            ],
            originalTitle: "Indices",
          },
          {
            title: "Futures",
            symbols: [
              {
                s: "CME_MINI:ES1!",
                d: "S&P 500",
              },
              {
                s: "CME:6E1!",
                d: "Euro",
              },
              {
                s: "COMEX:GC1!",
                d: "Gold",
              },
              {
                s: "NYMEX:CL1!",
                d: "Oil",
              },
              {
                s: "NYMEX:NG1!",
                d: "Gas",
              },
              {
                s: "CBOT:ZC1!",
                d: "Corn",
              },
            ],
            originalTitle: "Futures",
          },
          {
            title: "Bonds",
            symbols: [
              {
                s: "CME:GE1!",
                d: "Eurodollar",
              },
              {
                s: "CBOT:ZB1!",
                d: "T-Bond",
              },
              {
                s: "CBOT:UB1!",
                d: "Ultra T-Bond",
              },
              {
                s: "EUREX:FGBL1!",
                d: "Euro Bund",
              },
              {
                s: "EUREX:FBTP1!",
                d: "Euro BTP",
              },
              {
                s: "EUREX:FGBM1!",
                d: "Euro BOBL",
              },
            ],
            originalTitle: "Bonds",
          },
          {
            title: "Forex",
            symbols: [
              {
                s: "FX:EURUSD",
                d: "EUR to USD",
              },
              {
                s: "FX:GBPUSD",
                d: "GBP to USD",
              },
              {
                s: "FX:USDJPY",
                d: "USD to JPY",
              },
              {
                s: "FX:USDCHF",
                d: "USD to CHF",
              },
              {
                s: "FX:AUDUSD",
                d: "AUD to USD",
              },
              {
                s: "FX:USDCAD",
                d: "USD to CAD",
              },
            ],
          },
        ],
      });

      document
        .querySelector(".tradingview-market-overview-container__widget")
        .appendChild(script);
    };
  }, []);

  return <div className="tradingview-market-overview-container__widget"></div>;
};

export default MarketOverview;
