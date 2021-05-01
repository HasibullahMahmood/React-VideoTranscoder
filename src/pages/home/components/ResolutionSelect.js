import React, { Component } from "react";
import { FormLabel } from "react-bootstrap";

import MultiSelect from "../../../components/MultiSelect";
import AvailableResolutions from "../../../data/availableResolutions";

class ResolutionSelect extends Component {
  state = {
    options: AvailableResolutions,
  };
  render() {
    const { options } = this.state;
    const { selectedObjects, onSelect } = this.props;
    return (
      <>
        <FormLabel className="label">Resolution</FormLabel>
        <MultiSelect
          selectedObjects={selectedObjects}
          onSelect={onSelect}
          options={options}
          defaultValue={options[1]}
        />
      </>
    );
  }
}

export { ResolutionSelect };
