import React, { useEffect } from "react";

const CryptoScreener = ({width, height}) => {
  useEffect(() => {
    return () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.innerHTML = JSON.stringify({
        width: width,
        height: height,
        defaultColumn: "overview",
        screener_type: "crypto_mkt",
        displayCurrency: "USD",
        colorTheme: "dark",
        locale: "en",
        isTransparent: false,
      });
      document
        .querySelector(".tradingview-screener-widget")
        .appendChild(script);
    };
  }, []);

  return (
      <div className="tradingview-screener-widget"></div>
  );
};

export default CryptoScreener;
