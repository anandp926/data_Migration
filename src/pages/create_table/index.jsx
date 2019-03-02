import React, { Component } from 'react';
import Form from '../../components/form/form';
import InputText from '../../components/form/text-input/text_input';
import Button from '../../components/form/button/button'

class CreateTable extends Component {
    render() {
        return(
            <div className="container">
                <Form>
                    <div className="form-helper-text">
                        <strong>Enter Table Name<span>*</span></strong>
                    </div>
                    <InputText 
                        label="Table Name"
                    />
                    <div className="form-helper-text">
                        <strong>Add Data Into Table<span>*</span></strong>
                    </div>
                    <div className="form-input-row">
                        <InputText 
                            label="Name"
                        />
                        <InputText 
                            label="Value"
                            default="null"
                        />
                        <Button color="primary">Add Row</Button>
                        <Button color="secondary" disabled={true}>Remove Row</Button>
                    </div>
                    <Button color="primary" size="large">Save</Button>
                </Form>
            </div>
        )
    }
}

export default CreateTable