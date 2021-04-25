import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti(props) {
	const { selectedObj, onSelect, options, className, defaultValue } = props;
	return (
		<Select
			closeMenuOnSelect={false}
			components={animatedComponents}
			isMulti
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
