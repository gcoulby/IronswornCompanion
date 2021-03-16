import React, { Component } from "react";
import UnselectedPlayer from "./unselected_player";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class Log extends Component {
  handleKeyDown = (evt) => {
    if (evt.shiftKey && evt.key == "Enter") {
      evt.preventDefault();
      this.props.onAddLog();
    } else if (evt.ctrlKey && evt.key == "Enter") {
      evt.preventDefault();
      this.props.onAddLog(true);
    }
  };

  render() {
    if (this.props.logs == null) return <UnselectedPlayer />;
    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>

        <div>
          <ul className="log-ul" id="background_log">
            {this.props.logs.map((log) => (
              <li
                className="log-li card bg-light"
                key={UniqueKeyGenerator.generate()}
              >
                <div
                  className={`card-header text-white bg-${
                    log.isMeta ? "secondary" : "dark"
                  } "`}
                >
                  <div className="row">
                    <div className="col-10">
                      <i
                        className={`fas fa-${
                          log.isMeta ? "terminal" : "pen-nib"
                        }`}
                      ></i>
                      &emsp;
                      <span className="modesto">
                        {new Date(log.ts).toDateString()}&nbsp;-&nbsp;
                        {new Date(log.ts).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="col-2 text-right">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          this.props.onLogItemDeleted(
                            this.props.logs.indexOf(log)
                          )
                        }
                      >
                        <i className="fas fa-times"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">{log.text}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="input-group">
          <textarea
            className="form-control"
            onChange={(e) => this.props.onLogInputChanged(e, this)}
            value={this.props.logInput}
            rows="4"
            onKeyDown={(e) => this.handleKeyDown(e)}
          ></textarea>
          <div className="input-group-append">
            <button
              className="btn btn-dark"
              onClick={() => this.props.onAddLog()}
            >
              <i className="fas fa-pen-nib"></i>
              &nbsp;Add Fiction
              <div className="keys">
                <span className="key">Shift</span> +{" "}
                <span className="key">Enter</span>
              </div>
            </button>
          </div>
          <div className="input-group-append">
            <button
              className="btn btn-secondary"
              onClick={() => this.props.onAddLog(true)}
            >
              <i className="fas fa-terminal"></i>
              &nbsp;Add Meta
              <div className="keys">
                <span className="key">Ctrl</span> +{" "}
                <span className="key">Enter</span>
              </div>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Log;
