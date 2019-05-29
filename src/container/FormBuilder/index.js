import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Button, Input} from 'reactstrap';
import {parse, stringify} from 'query-string'
import {SelectDropDown} from '../../components'
import {Dropdown,InputText, StaticText, Radio}  from './components'

const options = [
  { value: 'static', label: 'Text (non-input/static)' },
  { value: 'text', label: 'Input text' },
  { value: 'radio', label: 'Input Radio Button'},
  {	value: 'dropdown', label: 'Select DropDown'}
   
]



function FormBuilder (props)  {
	const [formTitle, setFormTitle] = useState('')
	const [formDesc, setFormDesc] = useState('')
	const [type, setType] = useState('static')
	const [option, setOption] = useState(0)
	const [currentQuestion, setCurrentQuestion] = useState({})
	const [questions, setQuestions] = useState([])


	function handleFormChange(e,value){
			if(value==='title'){
				setFormTitle(e.target.value)
			}else if(value==='desc'){
				setFormDesc(e.target.value)
			}
	}

	function handleOnChange(option){
		setType(option.value)
		setOption(options.indexOf(option))

	}
	
	function handleQuestionText(value,key, third){
	
		setCurrentQuestion({ 'type': key,
					   'text': value,
					   'options': third

					})

		
	
	}

	function handleExistingText(value, key, third, position){
		const copyQuestions = questions
		copyQuestions.splice(position,1)
		copyQuestions.splice(position,0, {'type': key,
					   'text': value,
					   'options': third})
		setQuestions([...copyQuestions])
	}

	function addQuestion(){
		setQuestions([
			...questions,
			currentQuestion])
		setCurrentQuestion({})
	}

	function downloadJson(){
			var data = {
   					 key: 'value'
						};
			var fileName = 'myData.json';
			const copyQuestions = questions
		    copyQuestions.push({formTitle: formTitle,
								 formDesc:formDesc})
		
			var fileToSave = new Blob([JSON.stringify(copyQuestions)], {
   									 type: 'application/json',
   									 name: fileName
								});

			saveAs(fileToSave, fileName);
	}

	function handleChangePosition(position, where){
		
	}

	function handleDeleteQuestion(position){
		const copyQuestions = questions
		copyQuestions.splice(position,1)
		setQuestions([...copyQuestions])

	}

	function renderType(){
		switch(type) {
    		case 'static':
     			 return <StaticText placeholder={'Write a text here'} onChange={handleQuestionText}  />;
    		case 'text':
     			 return <InputText  placeholder={'Write the placeholder'} onChange={handleQuestionText} />;
    		case 'radio':
     			 return <Radio placeholder={'Write a text here'} onChange={handleQuestionText} />;
     		case 'dropdown':
     			 return <Dropdown placeholder={'Write a text here'} onChange={handleQuestionText}/>	 
   		    default:
      		    return null;
  		}
	}

	//rendering functions

	function renderSideBar(i){
				return(
							<div className="form-padding">
								{/*<i  onClick={() => handleChangePosition(i, 'up')} className="fas fa-arrow-up icon-padding"></i>
								<i  onClick={() => handleChangePosition(i, 'down')} className="fas fa-arrow-down icon-padding"></i>*/}
								<i  onClick={() => handleDeleteQuestion(i)} className="fa fa-trash icon-padding" aria-hidden="true"></i>
							</div>
		 			  )		  
	}


	function renderQuestions(){
	 	return questions.map((item, i)=>{
	 		switch(item['type']) {
    			case 'static':
     				  return (
     				  		 <div  className="form-inlineflex border">
     				  				<StaticText placeholder={'Write a text here'} value={item['text']}  position={i} onChange={handleExistingText}  />
     				  				{renderSideBar(i)}
     				  		</div>
     				  	     )
    			case 'text':
     			 	  return (
     			 	  		  <div >
     			 	  			<InputText placeholder={item['text']} char={item['options']} position={i} onChange={handleExistingText}  />
     			 	  			{renderSideBar(i)}
     			 	  		   </div>
     			 	  		)
    			case 'radio':
     				  return( <div>
     				  			<Radio placeholder={'Write a text here'} value={item['text']} options={item['options']} position={i} onChange={handleExistingText} />
     				  			{renderSideBar(i)}
     				  		   </div>	
     				  		)
     			case 'dropdown':
     			 	  return ( <div>
     				  			<Dropdown placeholder={'Write a text here'} value={item['text']} options={item['options']} position={i} onChange={handleExistingText} />
     				  			{renderSideBar(i)}
     				  		   </div>	
     				  		) 
   		  	    default:
      		    	return null;
  			}
		})
	}


	return(
		 <div>
		 	<div>
		 		<div className="form-flex div-margin"><span> Title:</span><Input onChange={(e) => handleFormChange(e,'title')} placeholder="untitled form"></Input></div>
		 		<div className="form-flex div-margin"><span> Desc:</span> <Input onChange={(e) => handleFormChange(e,'desc')} type='textarea' placeholder="form description"></Input></div>
		 	</div>
		 	<div className="div-margin">
		 		Question Type:<SelectDropDown placeholder={'Select Question Type'} options={options} value={options[option]} onChange={handleOnChange}/>
		 		{renderType()}
			</div>

		 	<Button	onClick={addQuestion}>Add Component</Button>
		 	<div>
		 		{renderQuestions()}
		 	</div>
		 	<Button className="div-margin"  onClick={downloadJson}>Download Json</Button>
		 </div>

		)


}


export default FormBuilder