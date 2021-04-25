import React, { Component } from 'react';
import { FormLabel } from 'react-bootstrap';

import MultiSelect from '../../components/MultiSelect';

class ResolutionSelect extends Component {
	state = {
		options: [
			{
				label: '4K',
				value: 1,
			},
			{
				label: '1080p',
				value: 2,
			},
			{
				label: '720p',
				value: 3,
			},
			{
				label: '480p',
				value: 4,
			},
			{
				label: '360p',
				value: 5,
			},
			{
				label: '240p',
				value: 6,
			},
			{
				label: '144p',
				value: 7,
			},
		],
	};
	render() {
		const { options } = this.state;
		const { selectedObj, onSelect } = this.props;
		return (
			<>
				<FormLabel className="label">Resolution</FormLabel>
				<MultiSelect
					selectedObj={selectedObj}
					onSelect={onSelect}
					options={options}
					defaultValue={options[1]}
				/>
			</>
		);
	}
}

export default ResolutionSelect;
