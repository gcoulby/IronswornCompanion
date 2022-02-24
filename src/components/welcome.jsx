import React, { Component } from "react";
import gclogo from "../img/gc_logoai.svg";
import KoFi from "../scripts/KoFi";
class Welcome extends Component {
  state = {};

  getQuotaUsage = () => {
    return `${(this.props.dataSize / 5000000).toFixed(2)}%`;
  };

  render() {
    return (
      <React.Fragment>
        <h3 id="site-title">IRONSWORN</h3>
        <h1 id="site-subtitle">COMPANION</h1>
        <h6 className="text-light">Version {this.props.version}</h6>
        <React.Fragment>
          <h6 className="text-light">You've used {this.getQuotaUsage()} of the 5MB storage quota</h6>
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="progress">
                <div
                  className="progress-bar bg-dark"
                  role="progressbar"
                  style={{ width: this.getQuotaUsage() }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="alert alert-secondary mt-4">
                <p>
                  This app is available as an Early Access release and is considered "In Development". As such, there
                  are expected to be bugs in the application.
                </p>
                <p>Should you find a bug or you have a feature request please post on my FeatureUpvote page:</p>
                <a
                  className="btn btn-dark"
                  // href="https://docs.google.com/spreadsheets/d/1GXvsk8f_Kx_lVNN78J1027Np0T7-pF1pLZsqnJA6-fE/edit#gid=1386834576"
                  href="https://ironsworncompanion-feedback-douzcvfz.featureupvote.com/"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp; Report an Issue
                </a>
              </div>
              <div className="alert alert-secondary">
                <p>This app was created by Graham Coulby</p>
                <div className="row">
                  <div className="col">
                    <a href="https://grahamcoulby.co.uk/" target="_blank" rel="noreferrer noopener">
                      <img src={gclogo} alt="img" width="100px" />
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="text-left my-3">
                      {/* <KoFi buttonColor="dark" color="#000" id="X8X64ELNE" label="Thank Graham with KoFi*" /> */}
                      <p>
                        <b>Apologies:</b> While I would love to be in a position to give this app my full attention. I
                        am currently working full-time while completing a Ph.D. part-time. Thus, my ability to maintain
                        this app is ever waning. If anyone would like to support this project please consider forking
                        the repository and submitting pull requests. Please private message me via the Ironsworn discord
                        to discuss this. It is for this reason that all of the Ko-Fi links have been removed, as even
                        though they are not for goods or services as I do not feel comfortable collecting donations when
                        I am not actively working on this regularly.
                      </p>
                      <a
                        className="btn btn-dark"
                        // href="https://docs.google.com/spreadsheets/d/1GXvsk8f_Kx_lVNN78J1027Np0T7-pF1pLZsqnJA6-fE/edit#gid=1386834576"
                        href="https://github.com/gcoulby/IronswornCompanion"
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        <i className="fab fa-github" aria-hidden="true"></i>&nbsp; Fork on Github
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div id="welcome-page-notice" className="alert alert-secondary my-4">
                    This application is still heavilly under development and is live only to demonstrate functionality
                    and receive feedback. As a result, it cannot be guaranteed that save files created in this version
                    of the application will work in all future versions.
                </div> */}
        </React.Fragment>
        {/* )} */}
        <div id="bg-image"></div>
      </React.Fragment>
    );
  }
}

export default Welcome;
