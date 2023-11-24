import React from 'react'

const SubHeader = () => {
    function toggleSubheaderVisibility() {
      let $SUBHEADER = document.getElementById("dashboardSubHeader");
  
      if ($SUBHEADER.classList.contains("d-none")){
        $SUBHEADER.classList.remove("d-none");
        $SUBHEADER.classList.add("visible")
      }       
    }

    function hideSubheader(){
      let $SUBHEADER = document.getElementById("dashboardSubHeader");
      $SUBHEADER.classList.remove("visible");
      $SUBHEADER.classList.add("d-none");
    }
  return (
    <header className="subheader fixed-top b-0 d-none" id='dashboardSubHeader' onMouseEnter={
      toggleSubheaderVisibility
    }
    onMouseLeave={
      hideSubheader}
    >
      <nav className="subnavbar navbar-expand-lg" role="navigation">
        <div class="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptionsr"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
          >
            <div class="offcanvas-header">
              <button
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul className="navbar-nav ">
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="/dashboard_macro" className="icon-link">
                      <img
                        src="static/images/subnavbar1.svg"
                        alt="Macro"
                        className="svg-icon"
                      />
                      <span className="svg-text">Macro</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="/dashboard" className="icon-link">
                      <img
                        src="static/images/subnavbar4.svg"
                        alt="Crypto"
                        className="svg-icon"
                      />
                      <span className="svg-text">Crypto</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#btc" className="icon-link">
                      <img
                        src="static/images/subnavbar2.svg"
                        alt="BTC"
                        className="svg-icon"
                      />
                      <span className="svg-text">Bitcoin</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#eth" className="icon-link">
                      <img
                        src="static/images/subnavbar3.svg"
                        alt="ETH"
                        className="svg-icon"
                      />
                      <span className="svg-text">Ethereum</span>
                    </a>
                  </div>
                </li>

                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#crypto5" className="icon-link">
                      <img
                        src="static/images/subnavbar5.svg"
                        alt="Crypto"
                        className="svg-icon"
                      />
                      <span className="svg-text">Crypto</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#crypto6" className="icon-link">
                      <img
                        src="static/images/subnavbar6.svg"
                        alt="Crypto"
                        className="svg-icon"
                      />
                      <span className="svg-text">Crypto</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#crypto7" className="icon-link">
                      <img
                        src="static/images/subnavbar7.svg"
                        alt="Crypto"
                        className="svg-icon"
                      />
                      <span className="svg-text">Crypto</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#crypto8" className="icon-link">
                      <img
                        src="static/images/subnavbar8.svg"
                        alt="Crypto"
                        className="svg-icon"
                      />
                      <span className="svg-text">Crypto</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#crypto9" className="icon-link">
                      <img
                        src="static/images/subnavbar9.svg"
                        alt="Crypto"
                        className="svg-icon"
                      />
                      <span className="svg-text">Crypto</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#crypto10" className="icon-link">
                      <img
                        src="static/images/subnavbar10.svg"
                        alt="Crypto"
                        className="svg-icon"
                      />
                      <span className="svg-text">Crypto</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#crypto11" className="icon-link">
                      <img
                        src="static/images/subnavbar11.svg"
                        alt="Crypto"
                        className="svg-icon"
                      />
                      <span className="svg-text">Crypto</span>
                    </a>
                  </div>
                </li>
                <li className="nav-item svg-button">
                  <div className="icon-container">
                    <a href="#crypto12" className="icon-link">
                      <img
                        src="static/images/subnavbar12.svg"
                        alt="Crypto"
                        className="svg-icon"
                      />
                      <span className="svg-text">Crypto</span>
                    </a>
                  </div>
                </li>
                <div className="hidden" id="gated-content"></div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default SubHeader;