import React, { Component } from 'react';
import { FormLabel } from 'react-bootstrap';

import CustomSelect from '../../../components/CustomSelect';
import formatsAndCodecs from '../../../data/formatsAndCodecs';

class VideoFormatSelect extends Component {
	render() {
		const { selectedFormat, onFormatSelect } = this.props;
		return (
			<>
				<FormLabel className="label">Video Format</FormLabel>
				<CustomSelect options={formatsAndCodecs} selectedObj={selectedFormat} onSelect={onFormatSelect} />
			</>
		);
	}
}

export { VideoFormatSelect };
