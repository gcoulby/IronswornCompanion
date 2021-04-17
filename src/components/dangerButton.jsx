import React, { Component } from "react";
class DangerButton extends Component {
  state = {
    show: false,
  };

  changeModalState(show) {
    this.setState({ show });
  }

  handleDanger(id) {
    this.props.onDangerClick(id);
    this.changeModalState(false);
  }

  render() {
    return (
      <React.Fragment>
        <button
          className={`btn btn-danger ${this.props.additionalButtonClasses}`}
          onClick={() => this.changeModalState(true)}
        >
          <i className={this.props.iconClass}></i>&nbsp;{this.props.buttonText}
        </button>

        {this.state.show ? (
          <React.Fragment>
            <div id="dangerConfirm" className="popup text-left" data-width="600" data-height="200">
              <div className="overlay" onClick={() => this.changeModalState(false)}></div>
              <div className="card">
                <div className="card-header bg-dark text-light modesto">
                  <div className="row">
                    <div className="col">
                      <h6>Are you sure?</h6>
                    </div>
                    <div className="col text-right">
                      <button className="btn btn-sm btn-outline-light" onClick={() => this.changeModalState(false)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body text-center">
                  <div className="container">
                    <div className="row">
                      <div className="col text-dark">
                        <h6>{this.props.deleteMessage}</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button className="btn btn-dark mx-2" onClick={() => this.changeModalState(false)}>
                          <i className="fa fa-times" aria-hidden="true"></i>&nbsp;No
                        </button>
                        <button className="btn btn-danger mx-2" onClick={() => this.handleDanger(this.props.deleteId)}>
                          <i className="fa fa-check" aria-hidden="true"></i>&nbsp;Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default DangerButton;
