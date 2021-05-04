import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti(props) {
	const { selectedObjects, onSelect, options, className } = props;

	return (
		<Select
			closeMenuOnSelect={false}
			components={animatedComponents}
			isMulti
			defaultValue={[options[0]]}
			value={selectedObjects}
			onChange={onSelect}
			options={options}
			noOptionsMessage={() => 'No Options'}
			placeholder="Select..."
			className={'select-default ' + className}
			menuPortalTarget={document.querySelector('body')}
		/>
	);
}
