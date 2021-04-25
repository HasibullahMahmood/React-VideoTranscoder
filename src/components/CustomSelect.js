import React, { Component } from 'react';
import Select from 'react-select';

class CustomSelect extends Component {
	render() {
		const {
			selectedObj,
			onSelect,
			options,
			className,
			defaultValue,
		} = this.props;
		return (
			<Select
				defaultValue={defaultValue}
				value={selectedObj}
				onChange={onSelect}
				options={options}
				noOptionsMessage="No Options"
				placeholder="Select..."
				className={'select-default ' + className}
				menuPortalTarget={document.querySelector('body')}
			/>
		);
	}
}

export default CustomSelect;
