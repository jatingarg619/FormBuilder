import React, { useState } from 'react';
import { Input} from 'reactstrap';


export default function InputText(props){
	const [value,setValue] = useState(props.value || '')
	const [char, setChar] = useState(props.char || 0)

	function handleOnChange(e,type){
		setValue(e.target.value)
		props.onChange(e.target.value, type, char, props.position)

	}


	function handleOnCharChange(e,type){
		setChar(e.target.value)
		props.onChange(value,type, e.target.value, props.position)
	}




	return(
		 <div className="div-margin form-flex">
		 	Text: <Input placeholder={props.placeholder} value={value} onChange={(e) => handleOnChange(e, 'text')}/>
		 	Allowed Characters: <Input value={char} onChange={(e) => handleOnCharChange(e, 'text')}/>
		 </div>
		)
}