import React, { Component } from 'react';
import { FormLabel } from 'react-bootstrap';

import CustomSelect from '../../../components/CustomSelect';
import formatsAndCodecs from '../../../data/formatsAndCodecs';

class CodecSelect extends Component {
	render() {
		const { selectedFormat, selectedCodec, onCodecSelect } = this.props;
		let options = [{ label: '', value: '' }];
		for (let i = 0; i < formatsAndCodecs.length; i++) {
			let format = formatsAndCodecs[i];
			if (format.value === selectedFormat.value) {
				options = format.codecs;
				break;
			}
		}
		return (
			<>
				<FormLabel className="label">Codec</FormLabel>
				<CustomSelect selectedObj={selectedCodec} onSelect={onCodecSelect} options={options} />
			</>
		);
	}
}

export { CodecSelect };
