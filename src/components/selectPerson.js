import React from 'react';
import Select from 'react-select';
 
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ];
 
export default class SelectPerson extends React.Component {
  state = {
    options:[],
    selectedOption: null,
  }
  componentWillReceiveProps =(props)=>{
    this.setState({ options: this.props.people.map(item => ({ value: item._id, label: item.email })) })
  }
  handleChange = (selectedOption) => {
    
    this.setState({ selectedOption });
    
  }

  render() {
    const { selectedOption } = this.state;
    const { TransitAdd } = this.props
    return (
      <div>
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
        isMulti
      />
        <div className="add-member-btn-wrapper mt-15 text-right">
          <button onClick={()=> TransitAdd(this.state.selectedOption)} className="btn btn-custom-outline"><span><i className="fa fa-plus"></i></span> Add members</button>
        </div>
      </div>
    );
  }
}