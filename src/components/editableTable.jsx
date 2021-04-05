import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
class EditableTable extends Component {
  state = {
    enterPressed: false,
  };

  handleRowKeyDown = (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      this.props.onRowAdd();
      this.state.enterPressed = true;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.enterPressed == true) {
      let table = document.getElementById("oracleTable");
      table.rows[table.rows.length - 1].firstChild.focus();
      this.setState({ enterPressed: false });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ clear: "both" }}>
          <button className="btn btn-sm btn-dark mb-2" onClick={() => this.props.onRowAdd()}>
            <i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Add Row
          </button>
        </div>
        <div className="editableTable" style={{ maxHeight: 50 + "vh" }}>
          <table id="oracleTable" className="table table-striped modesto">
            <tbody>
              {this.props.list.map((l, index) => (
                <tr>
                  <ContentEditable
                    // id={`oracle_table_edit_row_${index}`}
                    innerRef={this.contentEditable}
                    html={l}
                    disabled={false}
                    onChange={(e) => this.props.onRowChange(e, index)}
                    onKeyPress={(e) => this.handleRowKeyDown(e)}
                    tagName="td"
                    width="90%"
                  />
                  <td className="text-right">
                    <button className="btn btn-sm btn-danger" onClick={() => this.props.onRowDelete(index)}>
                      <i className="fas fa-times fa-xs"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default EditableTable;
