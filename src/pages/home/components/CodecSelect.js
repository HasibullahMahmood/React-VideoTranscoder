import React, { Component } from "react";
import { FormLabel } from "react-bootstrap";

import CustomSelect from "../../../components/CustomSelect";

class CodecSelect extends Component {
  state = {
    options: [
      {
        label: "H.264",
        value: 1,
      },
      {
        label: "H.265",
        value: 2,
      },
      {
        label: "VP9",
        value: 3,
      },
    ],
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
