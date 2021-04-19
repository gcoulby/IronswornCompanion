import React, { Component } from "react";
class Modal extends Component {
  state = {
    show: false,
  };
  changeModalState = (show) => {
    this.setState({ show });
  };
  render() {
    return (
      <React.Fragment>
        <button className="btn btn-dark" onClick={() => this.changeModalState(true)}>
          <i className={this.props.icon} aria-hidden="true"></i> {this.props.buttonText}
        </button>
        {this.state.show ? (
          <React.Fragment>
            <div className="popup text-left" data-width={this.props.modalWidth} data-height={this.props.modalHeight}>
              <div className="overlay" onClick={() => this.changeModalState(false)}></div>

              <div className="card text-dark">
                {this.props.hideHeader ? (
                  React.Fragment
                ) : (
                  <React.Fragment>
                    <div className="card-header bg-dark text-light modesto" style={{ height: 60 + "px" }}>
                      <div className="row">
                        <div className="col-8">
                          <h6>
                            <i className={this.props.icon} aria-hidden="true"></i> {this.props.title}
                          </h6>
                        </div>
                        <div className="col text-right">
                          <button className="btn btn-sm btn-outline-light" onClick={() => this.changeModalState(false)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )}

                <div className="card-body">
                  <div className="row">{this.props.modalComponent}</div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          React.Fragment
        )}
      </React.Fragment>
    );
  }
}

export default Modal;
