import React, { useState }  from 'react';
import {  Input, Button} from 'reactstrap';


export default function Dropdown(props){
	const [options, setOptions] = useState(props.options || [])
	const [value, setValue] = useState(props.value || '')
	var currentOption = ''

	function renderOptions(){
		return options.map((item,i) => {

			return(
				 <li key={i}>{item}</li>
				)
		})
	}

	function addOption(type){
		const copyOptions = options
		copyOptions.push(currentOption)
		setOptions([...copyOptions])

		props.onChange(value, type, copyOptions, props.position)
	}

	function handleOnChange(e, type){
		setValue(e.target.value)
		props.onChange(e.target.value,type, options, props.position)

	}


	function handleOptionChange(e){
		currentOption = e.target.value
	}

	return(
		 <div className="div-margin">
		 	<div className="form-flex">
		 	Dropdown: <Input value={value} onChange={(e, dropdown) => handleOnChange(e, 'dropdown')}/>	
		 	</div>
		 	<div>
		 	<ul>Options:
		 	{renderOptions()}
		 	</ul>
		 	</div>
		 	<div className="form-flex">
		 	<Button onClick={() => addOption('dropdown')}>Add</Button>:<Input onChange={(e) => handleOptionChange(e)}/>
		 	</div>
		 </div>
		)
}