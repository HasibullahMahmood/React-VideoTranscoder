import React, { Component } from "react";
import { RiPlayCircleLine } from "react-icons/ri";
import { CgSoftwareDownload } from "react-icons/cg";
import { ProgressBar } from "react-bootstrap";

class OutputCart extends Component {
  cancelUploadHandler = () => {
    const { cancel, reset } = this.props;
    if (cancel) {
      cancel();
      reset();
    }
  };

  render() {
    const { progress, uploadSucceed } = this.props;

    return (
      <>
        <div className="text-center">
          <h4 className="home__cart-title">Outputs</h4>
        </div>
        <div>
          <div className="upload-label-container">
            <span className="upload-label">
              {uploadSucceed ? "Encoding" : "Uploading"} {progress.toFixed(0)}%
            </span>
            <span
              className="cancel-label"
              onClick={() => {
                uploadSucceed ? this.props.reset() : this.cancelUploadHandler();
              }}
            >
              {uploadSucceed ? "Reset" : "Cancel"}
            </span>
          </div>

          <ProgressBar now={progress} className="custom-progress-bar" />
        </div>
        <div>
          <table className="table output__table">
            <thead>
              <tr>
                <th className="col-3 col-lg-2 text-center">Resolution</th>
                <th className="col-2 col-lg-2 text-center">Size</th>
                <th className="col-7 col-lg-8">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-3 col-lg-2 text-center">720p</td>
                <td className="col-2 col-lg-2 text-center">100 MB</td>
                <td className="col-7 col-lg-8">
                  <label>encoding 80%</label>
                  <ProgressBar className="status__encoding" now={80} />
                </td>
              </tr>
              <tr>
                <td className="col-3 col-lg-2 text-center">480p</td>
                <td className="col-2 col-lg-2 text-center">70 MB</td>
                <td className="col-7 col-lg-8">
                  <label>encoding 55%</label>
                  <ProgressBar className="status__encoding" now={55} />
                </td>
              </tr>
              <tr>
                <td className="col-3 col-lg-2 text-center">360p</td>
                <td className="col-2 col-lg-2 text-center">30 MB</td>
                <td className="col-7 col-lg-8">
                  <div className="status__btns">
                    <button>
                      <RiPlayCircleLine size={20} className="mr-1" />
                      Play
                    </button>
                    <button>
                      <CgSoftwareDownload size={20} className="mr-1" />
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export { OutputCart };
