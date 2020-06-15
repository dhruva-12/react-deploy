import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Checkbox_component.css';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['1 star', '2 star', '3 star','4 star','5 star','free breakfast','pay at hotel'];
const defaultCheckedList = ['1 star', '2 star', '3 star','4 star','5 star'];

class Check_box_grid extends React.Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  onChange = checkedList => {
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
        <div className="site-checkbox-all-wrapper">
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Check_box_grid