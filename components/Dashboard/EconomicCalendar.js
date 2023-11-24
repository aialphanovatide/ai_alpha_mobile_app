import React, { useEffect } from "react";

const EconomicCalendar = ({width, height}) => {
  useEffect(() => {
    return () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.innerHTML = JSON.stringify({
        colorTheme: "dark",
        isTransparent: false,
        width: width,
        height: height,
        locale: "en",
        importanceFilter: "0,1",
        currencyFilter:
          "ARS,AUD,BRL,USD,CAD,CNY,EUR,FRF,DEM,INR,IDR,ITL,JPY,KRW,MXN,RUR,SAR,ZAR,TRL,GBP",
      });

      document
        .querySelector(
          ".tradingview-widget-container__widget_economic_calendar"
        )
        .appendChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget_economic_calendar"></div>
    </div>
  );
};

export default EconomicCalendar;
