import React, { Component } from 'react';
import Select from 'react-select';
import { components } from 'react-select';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

class CustomSelect extends Component {
	render() {
		const { selectedObj, onSelect, options, className, defaultValue } = this.props;
		return (
			<Select
				defaultValue={defaultValue}
				value={selectedObj}
				onChange={onSelect}
				options={options}
				noOptionsMessage={() => 'No Options'}
				placeholder="Select..."
				className={'select-default ' + className}
				menuPortalTarget={document.querySelector('body')}
				isOptionDisabled={(option) => option.isDisabled}
				components={{
					Option: Option,
				}}
			/>
		);
	}
}

const useStyles = makeStyles((theme) => ({
	customTooltip: {
		backgroundColor: 'black',
		fontSize: 12,
	},
	customArrow: {
		color: 'black',
	},
}));

const Option = (props) => {
	const { label, isDisabled } = props.data;
	const classes = useStyles();

	return (
		<components.Option {...props}>
			<Tooltip
				title={isDisabled ? 'Not supported' : ''}
				placement="bottom-start"
				arrow
				classes={{
					tooltip: classes.customTooltip,
					arrow: classes.customArrow,
				}}
			>
				<div className="d-flex align-align-items-center">
					<span>{label}</span>
				</div>
			</Tooltip>
		</components.Option>
	);
};

export default CustomSelect;
