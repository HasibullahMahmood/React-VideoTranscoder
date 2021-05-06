import React, { Component } from "react";

export default class videoStream extends Component {
  render() {
    const server = "http://localhost:5000";
    const videoType = `video/${this.props.videoFormat}`;
    const videoPath = `${server}/video/${this.props.folder}/${this.props.file}`;

    console.log(this.props.location);
    console.log(this.props);

    return (
      <div>
        <video id="videoPlayer" width="650" controls muted="muted" autoplay>
          <source src={videoPath} type={videoType} />
        </video>
      </div>
    );
  }
}
