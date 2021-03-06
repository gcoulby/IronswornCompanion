import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import gclogo from "../img/gc_logoai.png";
import gfm from "remark-gfm";
import toc from "remark-toc";
import source from "../README.md";

class Documentation extends Component {
  state = {
    post: null,
  };
  constructor() {
    super();
  }

  componentDidMount() {
    fetch(source)
      .then((res) => res.text())
      .then((post) => this.setState((state) => ({ ...state, post })))
      .catch((err) => console.error(err));
  }

  render() {
    return this.getDocumentationContent();
  }

  getDocumentationContent() {
    const { post } = this.state;
    return (
      <React.Fragment>
        <div className="documentation">
          <ReactMarkdown source={post} plugins={[gfm, toc]} />
        </div>
      </React.Fragment>
    );
  }
}

export default Documentation;
