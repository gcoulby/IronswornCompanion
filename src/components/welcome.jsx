import React, { Component } from "react";
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

        {!this.props.loggedIn ? (
          <React.Fragment>
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="alert alert-secondary">
                  <p>
                    You are not logged in. This app syncs data to Google Drive. Therefore you must authorise the app and
                    sign in.
                  </p>
                  <button className="btn btn-dark" id="signin-btn" onClick={() => this.props.signInFunction()}>
                    <i class="fa fa-user" aria-hidden="true"></i> Sign In
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="alert alert-secondary">
                  <p>
                    Welcome {this.props.googleAuth ? this.props.googleAuth.currentUser.le.wt.rV : ""}. The Ironlands
                    await you!
                  </p>
                  <button className="btn btn-dark" id="signout-btn" onClick={() => this.props.signOutFunction()}>
                    <i class="fa fa-user" aria-hidden="true"></i> Sign Out
                  </button>
                  {this.props.getAuthorisedGoogleDriveFiles ? (
                    <React.Fragment>
                      <button className="btn btn-dark" onClick={() => this.props.getAuthorisedGoogleDriveFiles()}>
                        <i class="fa fa-file" aria-hidden="true"></i> Files
                      </button>
                    </React.Fragment>
                  ) : (
                    React.Fragment
                  )}
                  {this.props.createGoogleDriveFolderIfNonExist ? (
                    <React.Fragment>
                      <button className="btn btn-dark" onClick={() => this.props.createGoogleDriveFolderIfNonExist()}>
                        <i class="fa fa-folder" aria-hidden="true"></i> Create Folder
                      </button>
                    </React.Fragment>
                  ) : (
                    React.Fragment
                  )}
                </div>
              </div>
            </div>
            {/* <button id="signout-btn">Sign Out</button> */}
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
                    This app has been made publically available in an alpha state for testing purposes. As such, there
                    are expected to be bugs in the application.
                  </p>
                  <p>Should you find a bug please report it here:</p>
                  <a
                    className="btn btn-dark"
                    href="https://docs.google.com/spreadsheets/d/1GXvsk8f_Kx_lVNN78J1027Np0T7-pF1pLZsqnJA6-fE/edit#gid=1386834576"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp; Report an Issue
                  </a>
                </div>
              </div>
            </div>
            {/* <div id="welcome-page-notice" className="alert alert-secondary my-4">
                    This application is still heavilly under development and is live only to demonstrate functionality
                    and receive feedback. As a result, it cannot be guaranteed that save files created in this version
                    of the application will work in all future versions.
                </div> */}
          </React.Fragment>
        )}
        <div id="bg-image"></div>
      </React.Fragment>
    );
  }
}

export default Welcome;
