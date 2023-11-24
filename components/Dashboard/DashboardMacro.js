import React, { useEffect, useState } from "react";
import TickerTape from "./TickerTape";
import Timeline from "./Timeline";
import EconomicCalendar from "./EconomicCalendar";
import CryptoScreener from "./CryptoScreener";
import MarketOverview from "./MarketOverview";
import TradingViewChart from "./TradingViewChart";
import TechnicalAnalysis from "./TechnicalAnalysis";
import CurrencyDropdown from "./CurrencyDropdown";
import useScreensize from "../../hooks/useScreensize";

const DashboardMacro = () => {
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
    <div id="DashboardMacro" className="dashboard container-fluid text-center">
    <div className="row mb-5">
      <div className="tickertape-container container-fluid col-12 mx-auto">
        <TickerTape />
      </div>
    </div>
    <div className={"row mb-5 g-0" + (width <= 400 ? "" : "")}>
      <div
        className={
          "eco-calendar-container container-fluid col-12 col-lg-auto align-self-start" +
          (width <= 400 ? "" : "")
        }
      >
        <EconomicCalendar
          width={width >= 768 ? "600" : "500"}
          height={height >= 750 ? "1400" : "750"}
        />
      </div>
      <div
        className={
          "market-container col-12 col-lg-auto align-self-start" +
          (width <= 400 ? " mx-auto" : "")
        }
      >
        <MarketOverview
          width={width >= 768 ? "600" : "500"}
          height={height >= 750 && width >= 768 ? "1400" : "800"}
        />
      </div>
      <div className="tech-analysis-container-1 container-fluid col-12 col-lg-auto mb-3">
        <div class="row mb-2">
          <CurrencyDropdown
          isCrypto={false}
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
              currentSymbol={"NYSE:ES"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={41}
            />
            <TechnicalAnalysis
              currentSymbol={"CME_MINI:NQ1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={45}
            />
            <TechnicalAnalysis
              currentSymbol={"CBOE:VX1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={51}
            />
            {/* 
            - - - Even id currencies - - - 
            */}
            <TechnicalAnalysis
              currentSymbol={"AMEX:SPY"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={48}
            />
            <TechnicalAnalysis
              currentSymbol={"CME:6E1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={50}
            />
            <TechnicalAnalysis
              currentSymbol={"NYSE:GOLD"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={56}
            />
            <TechnicalAnalysis
              currentSymbol={"CBOT:ZN1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={60}
            />
            <TechnicalAnalysis
              currentSymbol={"NASDAQ:QQQ"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={62}
            />
            <TechnicalAnalysis
              currentSymbol={"MCX:CRUDEOIL1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={53}
            />
            <TechnicalAnalysis
              currentSymbol={"CAPITALCOM:EURUSD"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={59}
            />
            <TechnicalAnalysis
              currentSymbol={"CAPITALCOM:GBPUSD"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={61}
            />
            <TechnicalAnalysis
              currentSymbol={"CAPITALCOM:USDCHF"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={65}
            />
            <TechnicalAnalysis
              currentSymbol={"ICEUS:DX1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={68}
            />
            <TechnicalAnalysis
              currentSymbol={"TVC:VIX"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={69}
            />
            <TechnicalAnalysis
              currentSymbol={"OANDA:HK33HKD"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={71}
            />
          </div>
        </div>
        <div class="row mb-2">
          <CurrencyDropdown
          isCrypto={false}
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
              currentSymbol={"NYSE:ES"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={43}
            />
            <TechnicalAnalysis
              currentSymbol={"CME_MINI:NQ1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={47}
            />
            <TechnicalAnalysis
              currentSymbol={"CBOE:VX1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={49}
            />
            {/* 
            - - - Even id currencies - - - 
            */}
            <TechnicalAnalysis
              currentSymbol={"AMEX:SPY"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={46}
            />
            <TechnicalAnalysis
              currentSymbol={"CME:6E1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={52}
            />
            <TechnicalAnalysis
              currentSymbol={"NYSE:GOLD"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={54}
            />
            <TechnicalAnalysis
              currentSymbol={"CBOT:ZN1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={58}
            />
            <TechnicalAnalysis
              currentSymbol={"NASDAQ:QQQ"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={64}
            />
            <TechnicalAnalysis
              currentSymbol={"MCX:CRUDEOIL1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={55}
            />
            <TechnicalAnalysis
              currentSymbol={"CAPITALCOM:EURUSD"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={57}
            />
            <TechnicalAnalysis
              currentSymbol={"CAPITALCOM:GBPUSD"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={63}
            />
            <TechnicalAnalysis
              currentSymbol={"CAPITALCOM:USDCHF"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={66}
            />
            <TechnicalAnalysis
              currentSymbol={"ICEUS:DX1!"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={67}
            />
            <TechnicalAnalysis
              currentSymbol={"TVC:VIX"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={70}
            />
            <TechnicalAnalysis
              currentSymbol={"OANDA:HK33HKD"}
              width={width >= 768 ? "500" : "450"}
              height="625"
              widgetId={72}
            />
          </div>
        </div>
      </div>
      {/* Charts for each currency - displays 2 per row on desktop - change the widgetId for each widget to generate it on a new container, overriding id's mean that the currency symbol will be taken from the last component with that id */}
      <div className="row gx-0 justify-content-center">
        <div className="tv-chart-container container-fluid col-12 col-lg-5">
          <TradingViewChart
            width={width >= 768 ? "110%" : "525"}
            height={height >= 800 ? "100%" : "500"}
            widgetId={3}
            symbol={"CAPITALCOM:DXY"}
          />
        </div>
        <div className="tv-chart-container container-fluid col-12 col-lg-5">
          <TradingViewChart
            width={width >= 768 ? "110%" : "525"}
            height={height >= 800 ? "100%" : "500"}
            widgetId={4}
            symbol={"CME_MINI:NQ1!"}
          />
        </div>
      </div>
      <div className="row gx-0 justify-content-center">
        <div className="tv-chart-container container-fluid col-12 col-lg-5">
          <TradingViewChart
            width={width >= 768 ? "110%" : "525"}
            height={height >= 800 ? "100%" : "500"}
            widgetId={5}
            symbol={"SPREADEX:SPX"}
          />
        </div>
        <div className="tv-chart-container container-fluid col-12 col-lg-5">
          <TradingViewChart
            width={width >= 768 ? "110%" : "525"}
            height={height >= 800 ? "100%" : "500"}
            widgetId={6}
            symbol={"FX:USDCHF"}
          />
        </div>
      </div>
      <div className="row gx-0 justify-content-center">
        <div className="tv-chart-container container-fluid col-12 col-lg-5">
          <TradingViewChart
            width={width >= 768 ? "110%" : "525"}
            height={height >= 800 ? "100%" : "500"}
            widgetId={7}
            symbol={"FX:EURUSD"}
          />
        </div>
      </div>
    </div>
  </div>
);
};


export default DashboardMacro;