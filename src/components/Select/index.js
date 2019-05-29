import React from 'react';
import Select from 'react-select';


export default class SelectDropDown extends React.Component {
  render () {
    return (
      <Select
        value={this.props.value}
        onChange={this.props.onChange}
        options= {this.props.options}
        placeholder= {this.props.placeholder}
        
      
      />
    )
  }
}