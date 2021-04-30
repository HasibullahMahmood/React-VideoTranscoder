import React, { Component } from "react";
import { FormLabel } from "react-bootstrap";

import CustomSelect from "../../../components/CustomSelect";

class VideoFormatSelect extends Component {
  state = {
    options: [
      {
        label: "mp4",
        value: 1,
      },
      {
        label: "avi",
        value: 2,
      },
      {
        label: "mpeg",
        value: 3,
      },
      {
        label: "mov",
        value: 4,
      },
      {
        label: "flv",
        value: 5,
      },
      {
        label: "3gp",
        value: 6,
      },
      {
        label: "webm",
        value: 7,
      },
      {
        label: "mkv",
        value: 8,
      },
    ],
  };
  render() {
    const { options } = this.state;
    const { selectedObj, onSelect } = this.props;
    return (
      <>
        <FormLabel className="label">Video Format</FormLabel>
        <CustomSelect
          selectedObj={selectedObj}
          onSelect={onSelect}
          options={options}
          defaultValue={options[0]}
        />
      </>
    );
  }
}

export { VideoFormatSelect };
