import React, { Component } from 'react';
import Form from '../../components/form/form';
import InputText from '../../components/form/text-input/text_input';
import Button from '../../components/form/button/button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove'

class CreateTable extends Component {

    state = {
        rows: [0],
        rowsCounter: 0
    }

    addRow = () => {
        let newRows;
        newRows = this.state.rows
        this.setState({ rowsCounter: this.state.rowsCounter + 1 }, () => {
            newRows.push(this.state.rowsCounter);
            this.setState({ rows: newRows });
        });
    }

    removeRow = (id) => {
        let newRows;
        newRows = this.state.rows;
        newRows.pop(id);
        this.setState({ rows: newRows })
    }

    render() {
        const { rows } = this.state;
        return (
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
                    {
                        this.state.rows.map((rowId, index) => (
                            <div className="form-input-row" key={rowId}>
                                <InputText
                                    label="Name"
                                />
                                <InputText
                                    label="Value"
                                />
                                <InputText
                                    label="Default Value"
                                    default="null"
                                />
                                {
                                    index === rows.length - 1
                                        ?
                                        <div>
                                            <Button color="primary" onClick={this.addRow}><AddIcon /></Button>
                                            <Button
                                                color="secondary" onClick={() => this.removeRow(rowId)}
                                                disabled={rows.length === 1 ? true : false}
                                            >
                                                <RemoveIcon />
                                            </Button>
                                        </div>
                                        : null
                                }
                            </div>
                        ))
                    }
                    <Button color="primary" size="large">Save</Button>
                </Form>
            </div>
        )
    }
}

export default CreateTable