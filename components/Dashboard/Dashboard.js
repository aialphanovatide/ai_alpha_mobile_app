import React, { useEffect, useState } from "react";
import TickerTape from "./TickerTape";
import CryptoScreener from "./CryptoScreener";
import TradingViewChart from "./TradingViewChart";
import TechnicalAnalysis from "./TechnicalAnalysis";
import CurrencyDropdown from "./CurrencyDropdown";
import useScreensize from "../../hooks/useScreensize";

const Dashboard = () => {
  const [currentSymbol, setCurrentSymbol] = useState("");
  const [secondarySymbol, setSecondarySymbol] = useState("");

  const { width, height } = useScreensize();

  // useEffect to display the selected symbol widget on the first widget.

  useEffect(() => {
    // console.log(currentSymbol);
    searchSelectedSymbol(currentSymbol, ".tech-widget-container");

    return () => {};
  }, [currentSymbol]);

  // useEffect to display the selected symbol widget on the second widget.

  useEffect(() => {
    console.log(secondarySymbol);
    searchSelectedSymbol(secondarySymbol, ".tech-widget-container-2");

    return () => {};
  }, [secondarySymbol]);

  useEffect(() => {
    return () => {
      console.log({ width, height });
    };
  }, [width, height]);

  function updateCurrentSymbol(symbol, containerClass) {
    setCurrentSymbol(symbol);
  }

  function updateSecondarySymbol(symbol, containerClass) {
    setSecondarySymbol(symbol);
  }

  // Searches in all the widgets in a element with a 'containerClass' class for the one that matches the current symbol, when found, the widget displays onto view.

  function searchSelectedSymbol(symbol, containerClass) {
    const $widgets = document.querySelector(containerClass);
    console.log($widgets);
    let $selected_widget = null;

    for (let i = 0; i < $widgets.children.length; i++) {
      console.log($widgets.children[i].getAttribute("data-currency"));

      if ($widgets.children[i].getAttribute("data-currency") === symbol) {
        $selected_widget = $widgets.children[i];
        console.log($selected_widget);
        // $selected_widget.focus();
        $selected_widget.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  }

  return (
    <div id="Dashboard" className="dashboard container-fluid text-center">
      <div className="row mb-5">
        <div className="tickertape-container container-fluid col-12 mx-auto">
          <TickerTape />
        </div>
      </div>
      <div className={"row mb-5 g-0" + (width <= 400 ? "" : "")}>
        <div className="screener-container container-fluid col-11 col-lg-8 mx-auto">
          <CryptoScreener
            width={width >= 1000 ? "100%" : "96%"}
            height={"100%"}
          />
        </div>
        <div className="tech-analysis-container-1 container-fluid col-12 col-lg-auto mb-3">
          <div class="row mb-2">
            <CurrencyDropdown
            isCrypto={true}
              updateCurrentSymbol={updateCurrentSymbol}
              containerClass={".tech-widget-container"}
              searchSelectedSymbol={searchSelectedSymbol}
            />
          </div>
          <div class="tech-scroll-container container-fluid mb-2">
            <div className={"tech-widget-container row mb-3"}>
              {/*
            - - - Odd id currencies - - -
            */}
              <TechnicalAnalysis
                currentSymbol={"BINANCE:BTCUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={1}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:SOLUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={3}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:AVAXUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={5}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:XRPUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={7}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:NEARUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={9}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:AAVEUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={11}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:FETUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={13}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:GMTUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={15}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:ARBUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={17}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:RPLUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={19}
              />
              {/* 
              - - - Even id currencies - - - 
              */}
              <TechnicalAnalysis
                currentSymbol={"BINANCE:ETHUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={2}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:ATOMUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={4}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:MATICUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={6}
              />
              <TechnicalAnalysis
                currentSymbol={"BYBIT:MKRUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={8}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:SUSHIUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={10}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:OCEANUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={12}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:LINKUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={14}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:OPUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={16}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:LDOUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={18}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:FXSUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={20}
              />
              <TechnicalAnalysis
                currentSymbol={"CRYPTOCAP:TOTALDEFI"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={42}
              />
            </div>
          </div>
          <div class="row mb-2">
            <CurrencyDropdown
            isCrypto={true}
              updateCurrentSymbol={updateSecondarySymbol}
              containerClass={".tech-widget-container-2"}
              searchSelectedSymbol={searchSelectedSymbol}
            />
          </div>
          <div class="tech-scroll-container container-fluid">
            <div className="tech-widget-container-2 row">
              {/*
            - - - Odd id currencies - - -
            */}
              <TechnicalAnalysis
                currentSymbol={"BINANCE:BTCUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={21}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:SOLUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={23}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:AVAXUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={25}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:XRPUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={27}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:NEARUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={29}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:AAVEUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={31}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:FETUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={33}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:GMTUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={35}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:ARBUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={37}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:RPLUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={39}
              />
              {/* 
              - - - Even id currencies - - - 
              */}
              <TechnicalAnalysis
                currentSymbol={"BINANCE:ETHUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={22}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:ATOMUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={24}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:MATICUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={26}
              />
              <TechnicalAnalysis
                currentSymbol={"BYBIT:MKRUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={28}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:SUSHIUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={30}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:OCEANUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={32}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:LINKUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={34}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:OPUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={36}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:LDOUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={38}
              />
              <TechnicalAnalysis
                currentSymbol={"BINANCE:FXSUSDT"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={40}
              />
              <TechnicalAnalysis
                currentSymbol={"CRYPTOCAP:TOTALDEFI"}
                width={width >= 768 ? "500" : "450"}
                height="625"
                widgetId={44}
              />
            </div>
          </div>
        </div>
        {/* Charts for each currency - displays 2 per row on desktop - change the widgetId for each widget to generate it on a new container, overriding id's mean that the currency symbol will be taken from the last component with that id */}
        <div className="row justify-content-center">
          <div className="tv-chart-container container-fluid col-12 col-lg-5">
            <TradingViewChart
              widgetId={1}
              width={width >= 768 ? "110%" : "525"}
              height={height >= 900 ? "100%" : "500"}
              symbol={"BINANCE:BTCUSDT"}
            />
          </div>
          <div className="tv-chart-container container-fluid col-12 col-lg-5">
            <TradingViewChart
              width={width >= 768 ? "110%" : "525"}
              height={height >= 800 ? "100%" : "500"}
              widgetId={2}
              symbol={"BINANCE:ETHUSDT"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
