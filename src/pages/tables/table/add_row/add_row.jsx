import React from 'react';
import InputText from '../../../../components/form/text-input/text_input';
import Form from '../../../../components/form/form';
import Button from '../../../../components/form/button/button';
import { addRowIntoTable } from '../../../../service/api/tables'

export default class AddRow extends React.Component {
    state = {
        data: {},
        errorMsg: ''
    };

    onInputChange = (e) => {
        const { value, name } = e.target;
        const data = this.state.data;
        data[name] = value
        this.setState({ data })
    }

    cancle = () => {
        this.setState({ data: {} })
        this.props.handleClose();
    }

    addRowCallback = (data) => {
        if (data.status === 201) {
            console.log(data.data);
            this.props.handleClose();
        }
    }

    addRow = () => {
        this.props.tableData.push(this.state.data)
        const newData = {
            data: this.props.tableData
        }
        // console.log()
        if (Object.keys(this.state.data).length > 0) {
            this.setState({ errorMsg: '' })
            addRowIntoTable(this.addRowCallback, newData, this.props.tableName)
        } else {
            this.setState({ errorMsg: 'fill the details' })
        }
    }

    render() {
        const { columns } = this.props
        return (
            <div>
                <Form>
                    {
                        columns !== undefined && columns !== null && (
                            columns.columns.map((col) => (
                                <InputText
                                    label={col}
                                    name={col}
                                    onInputChange={this.onInputChange}
                                    key={col}
                                />
                            ))
                        )
                    }
                    {
                        this.state.errorMsg
                            ? <strong style={{ color: 'red' }}>{this.state.errorMsg}</strong>
                            : null
                    }
                    <div className="button-group float-right">
                        <Button size="large" color="secondary" onClick={this.cancle}>Cancel</Button>
                        <Button size="large" color="primary" onClick={this.addRow}>ADd</Button>
                    </div>
                </Form>

            </div>
        );
    }
}