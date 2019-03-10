import React, { Component } from 'react';
import Form from '../../components/form/form';
import InputText from '../../components/form/text-input/text_input';
import Button from '../../components/form/button/button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { getTables, postTables } from '../../service/api/tables';

class CreateTable extends Component {

    state = {
        rows: [{ "columnName": "", "columnType": "", "columnDefaultValue": "null" }],
        tableName: '',
        tables: []
    }

    //  tables call
    tablesCallback = (data) => {
        if (data.status === 200) {
            this.setState({ tables: data.data })
        }
    }

    componentDidMount() {
        getTables(this.tablesCallback);
    }

    addRow = () => {
        this.setState((prevState) => ({
            rows: [...prevState.rows, { "columnName": "", "columnType": "", "columnDefaultValue": "null" }],
        }));
    }

    removeRow = (id) => {
        let newRows;
        newRows = this.state.rows;
        newRows.pop(id);
        this.setState({ rows: newRows })
    }

    onEnterTableName = (e) => {
        if (e.target.value && this.state.tables) {
            this.setState({ tableName: e.target.value }, () => {
                Object.keys(this.state.tables)
                    .map((keys) => {
                        if (keys.trim().toLowerCase() === this.state.tableName.trim().toLowerCase()) {
                            return this.setState({ tableName: '' })
                        }
                    })
            })
        }
    }

    rowInputChange = index => (e) => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[index][name] = value;
        this.setState({ rows });
    }

    postTableCallback = (data) => {
        if (data.status === 201) {
            console.log(data.data)
        }
    }
    onFormSubmit = (e) => {
        const column = [];
        const { rows, tables } = this.state;
        if (rows && tables) {
            rows.map((col) => column.push(col.columnName))
            tables[this.state.tableName] = {
                columns: column
            }
            postTables(this.postTableCallback, tables)
        }
    }

    render() {
        const { rows } = this.state;
        // console.log(rows)
        return (
            <div className="container">
                <Form >
                    <div className="form-helper-text">
                        <strong>Enter Table Name<span>*</span></strong>
                    </div>
                    <InputText
                        label="Table Name"
                        onInputChange={this.onEnterTableName}
                    />
                    <div className="form-helper-text">
                        <strong>Add Prop Into Table<span>*</span></strong>
                    </div>
                    {
                        this.state.rows.map((rowId, index) => (
                            <div className="form-input-row" key={index}>
                                <InputText
                                    label="Column Name"
                                    name="columnName"
                                    onInputChange={this.rowInputChange(index)}
                                    value={this.state.rows[index].columnName}
                                />
                                <InputText
                                    label="Column Type"
                                    name="columnType"
                                    onInputChange={this.rowInputChange(index)}
                                    value={this.state.rows[index].columnType}
                                />
                                <InputText
                                    label="Default Value"
                                    name="columnDefaultValue"
                                    onInputChange={this.rowInputChange(index)}
                                    value={this.state.rows[index].columnDefaultValue}
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
                    <Button color="primary" size="large" onClick={this.onFormSubmit}>Save</Button>
                </Form>
            </div>
        )
    }
}

export default CreateTable