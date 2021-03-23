import React, { Component } from "react";
class Gallery extends Component {
  state = {};
  constructor(props) {
    super();
  }
  componentDidMount() {
    // let url = "https://api.imgur.com/3/album/" + this.props.imgurAlbumHash;
    // let response = fetch(url, {
    //   method: "GET",
    //   headers: {
    //     Authorization: "Client-ID 16b2811bb1e92a3",
    //   },
    // });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Gallery</h1>
        <div className="alert alert-secondary">
          Add an Imgur album hash to view the images of an Imgur album in the gallery. Use this to view your campaign
          photos from the app.
        </div>
      </React.Fragment>
    );
  }
}

export default Gallery;
