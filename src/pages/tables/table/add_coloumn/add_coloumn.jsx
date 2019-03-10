import React from 'react';
import InputText from '../../../../components/form/text-input/text_input';
import Form from '../../../../components/form/form';
import Button from '../../../../components/form/button/button';
import {addColIntoTable} from '../../../../service/api/tables'

export default class AddRow extends React.Component {
  state = {
    colName: '',
    colValue: ''
  };

  onInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  cancle = () => {
    this.setState({colName: '', colValue: ''});
    this.props.handleClose();
  }

  addColCallback = (data) => {
      if(data.status === 201) {
          console.log(data.data);
          this.props.handleClose();
      }
  }

  addCol = () => {
      if(this.props.columns && this.state.colName){
          this.props.columns.columns.push(this.state.colName);
          addColIntoTable(this.addColCallback, this.props.tables)
      }
  }

  render() {
    const {columns} = this.props
    return (
      <div>
          <Form>
            <InputText 
                label="Name"
                name="colName"
                onInputChange={this.onInputChange}
                value={this.state.colName}
            />
            <InputText 
                label="Value"
                name="colValue"
                onInputChange={this.onInputChange}
                value={this.state.colValue}
            />
            <div className="button-group float-right">
                <Button size="large" color="secondary" onClick={this.cancle}>Cancel</Button>
                <Button size="large" color="primary" onClick={this.addCol}>ADd</Button>
            </div>
          </Form>
          
      </div>
    );
  }
}