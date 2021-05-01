import React, { Component } from "react";
import { FormLabel } from "react-bootstrap";

import CustomSelect from "../../../components/CustomSelect";
import availableCodecs from "../../../data/availableCodecs";

class CodecSelect extends Component {
  state = {
    options: availableCodecs,
  };
  render() {
    const { options } = this.state;
    const { selectedObj, onSelect } = this.props;
    return (
      <>
        <FormLabel className="label">Codec</FormLabel>
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

export { CodecSelect };
