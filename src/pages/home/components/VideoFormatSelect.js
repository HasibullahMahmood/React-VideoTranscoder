import React, { Component } from "react";
import { FormLabel } from "react-bootstrap";

import CustomSelect from "../../../components/CustomSelect";
import AvailableFormats from "../../../data/availableFormats";

class VideoFormatSelect extends Component {
  state = {
    options: AvailableFormats,
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
