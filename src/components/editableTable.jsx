import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
class EditableTable extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div style={{ clear: "both" }}>
          <button className="btn btn-sm btn-dark mb-2" onClick={() => this.props.onRowAdd()}>
            <i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Add Row
          </button>
        </div>
        <div className="editableTable" style={{ maxHeight: 50 + "vh" }}>
          <table className="table table-striped modesto">
            <tbody>
              {this.props.list.map((l, index) => (
                <tr>
                  <ContentEditable
                    innerRef={this.contentEditable}
                    html={l}
                    disabled={false}
                    onChange={(e) => this.props.onRowChange(e, index)}
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
