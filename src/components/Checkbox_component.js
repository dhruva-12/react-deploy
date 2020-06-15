import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Checkbox_component.css';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['★ ', '★ ★ ', '★ ★ ★ ','★ ★ ★ ★ ','★ ★ ★ ★ ★ ','Free Breakfast','Pay at Hotel'];
const defaultCheckedList = ['★ ', '★ ★ ', '★ ★ ★ ','★ ★ ★ ★ ','★ ★ ★ ★ ★ '];

const hotelTypes = ['Hotels ','Apartments','Houses','Swimming Pool','Free Breakfast','Free Cancelation'];
const defaultHotelTypesList = ['bharat ','Pay at Hotel'];

class Check_box_grid extends React.Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  onChange = checkedList => {
    this.props.setCheckboxGroup(checkedList)
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    return (
      <div>
        {/* <div className="site-checkbox-all-wrapper"> */}
        <div>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Checked All
          </Checkbox>
        </div>
        <br />
        <div style={{fontSize:'14px',color: 'black'}}>Star ratings</div>
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />

        <br />
        <br />
        <div style={{fontSize:'14px',color: 'black'}}>Popular Filters</div>
        <CheckboxGroup
          options={hotelTypes}
          // value={this.state.checkedList}
          // onChange={this.onChange}
        />
         <br />
      </div>
      
    );
  }
}

export default Check_box_grid