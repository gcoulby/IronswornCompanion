import React, { Component } from "react";
import Editor from "rich-markdown-editor";
import SortableTree from "react-sortable-tree";
import ContentEditable from "react-contenteditable";
import DangerButton from "./dangerButton";
import _ from "lodash";
import { file } from "jszip";

class Journal extends Component {
  state = {
    fileKey: 0,
    lastEditValue: null,
    lastEditId: null,
    lastEditInterval: null,
  };

  reorderFiles = (treeData) => {
    const journalData = this.props.journalData;
    journalData.files = treeData;
    this.setState({ journalData });
  };

  addFile = () => {
    const journalData = this.props.journalData;
    journalData.files.push({
      id: journalData.nextId,
      title: "title",
      selected: false,
      children: [],
      content: "",
    });
    journalData.nextId++;
    this.setState({ journalData });
  };

  componentDidMount = () => {
    // this.handleTreeClick(this.props.journalData.files[0].id);
  };

  handleTreeClick = (id) => {
    const journalData = this.props.journalData;
    journalData.files = this.changeSelectedInNestedFileList(journalData.files, id);
    this.setState({ journalData });
    this.props.saveChangesToEditor();
    const fileKey = this.state.fileKey + 1;
    this.setState({ fileKey });
  };

  handleFileNameChange = (name, id) => {
    const journalData = this.props.journalData;
    journalData.files = this.changeVariableInNestedFileList(journalData.files, id, "title", name);
    this.setState({ journalData });
  };

  // handleFileContentsChange = (getValue, id) => {
  //   this.state.lastEditValue = getValue;
  //   this.state.lastEditId = id;
  //   clearTimeout(this.state.lastEditInterval);
  //   this.state.lastEditInterval = setTimeout(this.saveChanges, 1000);
  // };

  // saveChanges = () => {

  //   const journalData = this.props.journalData;
  //   journalData.files = this.changeVariableInNestedFileList(
  //     journalData.files,
  //     this.state.lastEditId,
  //     "content",
  //     this.state.lastEditValue
  //   );
  //   this.setState({ journalData });
  // };

  handleRemoveJournalFile = (id) => {
    const journalData = this.props.journalData;

    let pos = -1;
    for (let i = 0; i < journalData.files.length; i++) {
      let j = journalData.files[i];
      if (j.id === id) {
        pos = i;
      }
    }
    if (pos != -1) journalData.files.splice(pos, 1);
    this.setState({ journalData });
  };

  /*==============================*/
  /* GET NESTED FILE
  /*==============================*/

  getSelectedFile = () => {
    let file = this.getSelectedFileInNestedFileList(this.props.journalData.files);
    if (file != undefined) {
      return file;
    }
  };

  getSelectedFileInNestedFileList(files) {
    let file = undefined;
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      file = f.selected ? f : undefined;
      if (file != undefined) {
        return file;
      }
      file = this.getSelectedFileInNestedFileList(f.children);
      if (file != undefined) {
        return file;
      }
    }
  }

  /*==============================*/
  /* SET NESTED FILE PROPERTY
  /*==============================*/

  changeSelectedInNestedFileList = (array, id) => {
    return array.map((a) => {
      a.selected = a.id === id;
      a.children = this.changeSelectedInNestedFileList(a.children, id);
      return a;
    });
  };

  changeVariableInNestedFileList = (array, id, key, value) => {
    return array.map((a) => {
      if (a.id === id) {
        let val = value.replace(/<br>/g, "").replace(/&nbsp;/g, " ");
        a[key] = val;
      }
      a.children = this.changeVariableInNestedFileList(a.children, id, key, value);
      return a;
    });
  };

  /*==============================*/
  /* DELETE NESTED FILE
  /*==============================*/

  componentDidUpdate(prevProps, prevState) {
    this.props.onComponentUpdate(prevProps, prevState);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Journal</h1>
        <div className="row">
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col-lg-9 col-12">
            <div className="card journal-card p-4 mb-4">
              {this.getSelectedFile() ? (
                <React.Fragment>
                  <h2>
                    Title:{" "}
                    <ContentEditable
                      innerRef={this.contentEditable}
                      html={this.getSelectedFile().title}
                      disabled={false}
                      onChange={(e) => this.handleFileNameChange(e.target.value, this.getSelectedFile().id)}
                      tagName="span"
                      className="journalTitle"
                    />
                  </h2>
                  <div key={this.state.fileKey}>
                    <Editor
                      defaultValue={this.getSelectedFile().content}
                      onChange={(e) => this.props.handleFileContentsChange(e, this.getSelectedFile().id)}
                      placeholder="Write something about your journey..."
                    />
                  </div>
                  <div className="row journal-foot">
                    <div className="col-lg-6 col-12">
                      <i class="fas fa-save"></i>&nbsp;
                      <span>{this.props.lastJournalEditSaveComplete ? "All changes saved." : "Saving..."}</span>
                    </div>
                    <div className="col-lg-6 col-12 text-right">
                      <DangerButton
                        buttonText="Delete Journal Page"
                        additionalButtonClasses="btn-sm"
                        iconClass="fas fa-times"
                        onDangerClick={this.handleRemoveJournalFile}
                        deleteId={this.getSelectedFile().id}
                        deleteMessage="Are you sure you want to remove this journal entry?"
                      />
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="alert alert-secondary">Choose/Create a file to begin editing</div>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="col-lg-3 col-12">
            <div className="card p-3 " style={{ minHeight: "70vh" }}>
              <button className="btn btn-dark" onClick={() => this.addFile()}>
                <i className="fa fa-plus" aria-hidden="true"></i> Add File
              </button>
              <SortableTree
                style={{ minHeight: "70vh" }}
                treeData={[...this.props.journalData.files]}
                onChange={(treeData) => this.reorderFiles(treeData)}
                rowHeight={45}
                scaffoldBlockPxWidth={27}
                maxDepth={3}
                generateNodeProps={(rowInfo) => {
                  return {
                    editable: true,
                    className: `treeElement ${rowInfo.node.selected ? "selected" : ""}`,
                    onClick: (event) => {
                      if (
                        !event.target.className.includes("collapseButton") &&
                        !event.target.className.includes("expandButton")
                      ) {
                        this.handleTreeClick(rowInfo.node.id, "clickNode");
                      }
                    },
                  };
                }}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Journal;
