import React, { Component } from "react";
import UnselectedPlayer from "./unselected_player";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
import DangerButton from "./dangerButton";
import ContentEditable from "react-contenteditable";
class Log extends Component {
  state = {
    filter: "",
  };
  handleKeyDown = (evt) => {
    if (evt.shiftKey && evt.key == "Enter") {
      evt.preventDefault();
      this.props.onAddLog("fiction");
    } else if (evt.ctrlKey && evt.key == "Enter") {
      evt.preventDefault();
      this.props.onAddLog("meta");
    }
  };

  // handleLogInputChanged = (evt) => {
  //   this.setState({ logInput: evt.target.value });
  // };

  handleLogEntryChanged = (evt, id) => {
    console.log(id);
    const logs = this.props.logs.map((l) => {
      if (l.id == id) {
        l.text = evt.target.value.replace(/<br>/g, "").replace(/&nbsp;/g, " ");
      }
      return l;
    });
    this.setState({ logs: logs });
  };

  handleFilterChanged = (evt) => {
    this.setState({ filter: evt.target.value });
  };

  // handleAddLog = (type) => {
  //   if (this.state.logInput != "") {
  //     const logs = this.state.logs;
  //     logs.push({
  //       id: this.state.nextLogId,
  //       ts: new Date(),
  //       text: this.state.logInput,
  //       type: type,
  //     });
  //     this.setState({ nextLogId: this.state.nextLogId + 1 });
  //     this.setState({ logs: logs });
  //     this.setState({ logInput: "" });
  //   }
  // };

  // handleLogItemDeleted = (logId) => {
  //   const logs = this.state.logs.filter((l) => this.state.logs.indexOf(l) !== logId);
  //   this.setState({ logs });
  // };

  componentDidMount() {
    this.props.scrollBottom();
  }

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    if (this.props.logs == null) return <UnselectedPlayer />;

    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <p>
          {this.props.description} <br />
          <strong>Logs can be edited by clicking on the entry and changing the text.</strong>
        </p>

        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Filter</label>
              </div>

              <select className="form-control" value={this.state.filter} onChange={(e) => this.handleFilterChanged(e)}>
                <option value="">All</option>
                <option value="fiction">Fiction</option>
                <option value="meta">Meta</option>
                {this.props.title !== "Background" ? <option value="event">Events</option> : React.Fragment}
              </select>
            </div>
          </div>
        </div>

        <div>
          <ul className="log-ul" id="background_log">
            {this.props.logs
              .filter((l) => {
                if (this.state.filter === "" || this.state.filter === l.type) return l;
              })
              .map((log) => (
                <li className="log-li card bg-light" key={`logentry_${log.id}`}>
                  <div
                    className={`card-header text-white bg-${
                      log.type === "meta" ? "secondary" : log.type === "event" ? "muted" : "dark"
                    } ${log.type === "event" ? "text-dark" : ""}`}
                  >
                    <div className="row">
                      <div className="col-10">
                        <i
                          className={`fas fa-${
                            log.type === "meta" ? "terminal" : log.type === "event" ? "bolt" : "pen-nib"
                          }`}
                        ></i>
                        &emsp;
                        <span className="modesto">
                          {new Date(log.ts).toDateString()}&nbsp;-&nbsp;
                          {new Date(log.ts).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="col-2 text-right">
                        <DangerButton
                          buttonText=""
                          additionalButtonClasses="btn-sm"
                          iconClass="fas fa-times"
                          onDangerClick={this.props.onLogItemDeleted}
                          deleteId={this.props.logs.indexOf(log)}
                          deleteMessage="Are you sure you want to delete this log entry?"
                        />
                      </div>
                    </div>
                  </div>
                  <ContentEditable
                    className="card-body"
                    innerRef={this.contentEditable}
                    html={log.text}
                    disabled={false}
                    onChange={(e) => this.handleLogEntryChanged(e, log.id)}
                    tagName="div"
                    width="100%"
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="row">
          <div className="col">
            <textarea
              className="form-control"
              onChange={(e) => this.props.onLogInputChanged(e, this)}
              value={this.props.logInput}
              rows="3"
              onKeyDown={(e) => this.handleKeyDown(e)}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="btn-group btn-group-justified">
              <button className="btn  btn-block btn-dark" onClick={() => this.props.onAddLog("fiction")}>
                <i className="fas fa-pen-nib"></i>
                &nbsp;Add Fiction
                <div className="keys text-center">
                  <span className="key">Shift</span> + <span className="key">Enter</span>
                </div>
              </button>

              <button className="btn btn-block btn-secondary" onClick={() => this.props.onAddLog("meta")}>
                <i className="fas fa-terminal"></i>
                &nbsp;Add Meta
                <div className="keys text-center">
                  <span className="key">Ctrl</span> + <span className="key">Enter</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Log;
