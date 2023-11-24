import React from "react";

const CurrencyDropdown = ({
  isCrypto,
  updateCurrentSymbol,
  updateSecondarySymbol,
  containerClass,
  searchSelectedSymbol,
}) => {
  return (
    <div class="select-container container-fluid col-12 mb-4 mt-4">
      <select
        className="currency-selector"
        // onClick={(e) => {
        //   if (e.target.value === "") {
        //     return;
        //   }
        //   updateCurrentSymbol(e.target.value, containerClass);
        // }}
        onChange={(e) => {
          if (e.target.value === "") {
            return;
          }
          updateCurrentSymbol(e.target.value, containerClass);
        }}
      >
        {isCrypto ? (
        <>
        <option selected value="">
          Currency
        </option>
        <option
          value="BINANCE:BTCUSDT"
          class="currency-option"
        >
          BTCUSDT
        </option>
        <option
          value="BINANCE:ETHUSDT"
          class="currency-option"
        >
          ETHUSDT
        </option>
        <option value="BINANCE:SOLUSDT" class="currency-option">
          SOLUSDT
        </option>
        <option value="BINANCE:ATOMUSDT" class="currency-option">
          ATOMUSDT
        </option>
        <option value="BINANCE:AVAXUSDT" class="currency-option">
          AVAXUSDT
        </option>
        <option value="BINANCE:MATICUSDT" class="currency-option">
          MATICUSDT
        </option>
        <option value="BINANCE:XRPUSDT" class="currency-option">
          XRPUSDT
        </option>
        <option value="BYBIT:MKRUSDT" class="currency-option">
          MRKUSDT
        </option>
        <option value="BINANCE:NEARUSDT" class="currency-option">
          NEARUSDT
        </option>
        <option value="BINANCE:SUSHIUSDT" class="currency-option">
          SUSHIUSDT
        </option>
        <option value="BINANCE:AAVEUSDT" class="currency-option">
          AAVEUSDT
        </option>
        <option value="BINANCE:OCEANUSDT" class="currency-option">
          OCEANUSDT
        </option>
        <option value="BINANCE:FETUSDT" class="currency-option">
          FETUSDT
        </option>
        <option value="BINANCE:LINKUSDT" class="currency-option">
          LINKUSDT
        </option>
        <option value="BINANCE:GMTUSDT" class="currency-option">
          GMTUSDT
        </option>
        <option value="BINANCE:OPUSDT" class="currency-option">
          OPUSDT
        </option>
        <option value="BINANCE:ARBUSDT" class="currency-option">
          ARBUSDT
        </option>
        <option value="BINANCE:LDOUSDT" class="currency-option">
          LDOUSDT
        </option>
        <option value="BINANCE:RPLUSDT" class="currency-option">
          RPLUSDT
        </option>
        <option value="BINANCE:FXSUSDT" class="currency-option">
          FXSUSDT
        </option>
        <option value="CRYPTOCAP:TOTALDEFI" class="currency-option">
        TOTALDEFI
      </option>
      </>) : (
      <>
      <option selected value="">
          Macro Currency
        </option>
      <option value="NYSE:ES" class="currency-option">
          ES
        </option>
        <option value="CME_MINI:NQ1!" class="currency-option">
          NQ
        </option>
        <option value="AMEX:SPY" class="currency-option">
          SPY
        </option>
        <option value="CBOE:VX1!" class="currency-option">
          VX
        </option>
        <option value="CME:6E1!" class="currency-option">
          6E
        </option>
        <option value="NYSE:GOLD" class="currency-option">
          GOLD
        </option>
        <option value="CBOT:ZN1!" class="currency-option">
          ZN
        </option>
        <option value="NASDAQ:QQQ" class="currency-option">
          QQQ
        </option>
        <option value="MCX:CRUDEOIL1!" class="currency-option">
          CRUDEOIL
        </option>
        <option value="CAPITALCOM:EURUSD" class="currency-option">
          EURUSD
        </option>
        <option value="CAPITALCOM:GBPUSD" class="currency-option">
          GBPUSD
        </option>
        <option value="CAPITALCOM:USDCHF" class="currency-option">
          USDCHF
        </option>
        <option value="ICEUS:DX1!" class="currency-option">
          DX
        </option>
        <option value="TVC:VIX" class="currency-option">
          VIX
        </option>
        <option value="OANDA:HK33HKD" class="currency-option">
          HK33HKD
        </option>
        </>
        )}        
      </select>

      {/* <div class="dropdown-center">
        <button
          class="btn btn-lg currency-selector dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Currency
        </button>
        <ul
          class="dropdown-menu"
          onClick={(e) => updateCurrentSymbol(e.target.data_value)}
        > */}
      {/* Inside each <li></li> element belongs to a currency to select and view on TechnicalAnalysis widget */}
      {/* <li data_value="BINANCE:BTCUSDT" className="dropdown-item">
            BTCUSDT
          </li>
          <li value={"ETHUSDT"} className="dropdown-item">
            ETHUSDT
          </li>
          <li value={"SOLUSDT"} className="dropdown-item">
            SOLUSDT
          </li>
          <li value={"ATOMUSDT"} className="dropdown-item">
            ATOMUSDT
          </li>
          <li value={"MATICUSDT"} className="dropdown-item">
            AVAXUSDT
          </li>
          <li value={"XRPUSDT"} className="dropdown-item">
            XRPUSDT
          </li>
          <li value={"UNIUSDT"} className="dropdown-item">
            UNIUSDT
          </li>
          <li value={"MRKUSDT"} className="dropdown-item">
            MRKUSDT
          </li>
          <li value={"NEARUSDT"} className="dropdown-item">
            NEARUSDT
          </li>
          <li value={"SUSHIUSDT"} className="dropdown-item">
            SUSHIUSDT
          </li>
          <li value={"AAVEUSDT"} className="dropdown-item">
            AAVEUSDT
          </li>
          <li value={"OCEANUSDT "} className="dropdown-item">
            OCEANUSDT{" "}
          </li>
          <li value={"FETUSDT"} className="dropdown-item">
            FETUSDT
          </li>
          <li value={"LINKUSDT"} className="dropdown-item">
            LINKUSDT
          </li>
          <li value={"GMTUSDT"} className="dropdown-item">
            GMTUSDT
          </li>
          <li value={"OPUSDT"} className="dropdown-item">
            OPUSDT
          </li>
          <li value={"ARBUSDT"} className="dropdown-item">
            ARBUSDT
          </li>
          <li value={"RPLUSDT"} className="dropdown-item">
            RPLUSDT
          </li>
          <li value={"FXSUSDT"} className="dropdown-item">
            FXSUSDT
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default CurrencyDropdown;
