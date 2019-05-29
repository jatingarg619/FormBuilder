import React, { useState } from 'react';
import {  Input} from 'reactstrap';


export default function StaticText(props){
	const [value,setValue] = useState(props.value || '')


	function handleOnChange(e, key){
		setValue(e.target.value)
		props.onChange(e.target.value, key, null ,props.position)
	}



	return(
		 <div className="div-margin">
		 	Static: <input onChange={(e) => handleOnChange(e, 'static')} value={value} placeholder={props.placeholder} />
		 	
		 </div>
		)
}