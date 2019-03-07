import React, { Component } from 'react';
import './migrate.css';
import InputText from '../../components/form/text-input/text_input'
import Button from '../../components/form/button/button';
import { getTables } from '../../service/api/tables';
import { Select } from 'antd';
import Dropdown from '../../components/form/auto_select/auto_select'

const Option = Select.Option;

class Migrate extends Component {
    state = {
        tables: [],
        sourceTable: '',
        destinationTable: ''
    }

    onSourceTableSelect = (value) => {
        this.setState({ sourceTable: value })
    }

    onDestinationTableSelect = (value) => {
        this.setState({ destinationTable: value })
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

    render() {

        const { tables, sourceTable, destinationTable } = this.state;
        let sourceColumns, destinationColumn;
        if (tables && sourceTable) {
            sourceColumns = tables[sourceTable]
        }
        if (tables && destinationTable) {
            destinationColumn = tables[destinationTable]
        }
        // console.log(sourceColumns)
        return (
            <div className="container">
                <h3 className="text-center">Select Tables for Data Migration</h3>
                <div className="migrate-table-selection">
                    <div className="migrate-table-selection-1">
                        <Dropdown
                            labelName="Source Table"
                            placeholder="Select Source Table"
                            optionFilterProp="children"
                            onSelect={this.onSourceTableSelect}
                            size="large"
                            isRequired={true}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            classValue='inputField-outline'
                        >
                            {
                                tables && (
                                    Object.keys(tables).map((keys) => (
                                        <Option value={keys} key={keys}>{keys}</Option>
                                    ))
                                )
                            }
                        </Dropdown>
                    </div>
                    <div className="migrate-table-selection-2">
                        <Dropdown
                            labelName="Destination Table"
                            placeholder="Select Destination Table"
                            optionFilterProp="children"
                            onSelect={this.onDestinationTableSelect}
                            size="large"
                            isRequired={true}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            classValue={this.state.productIdWarn ? 'inputField-outline' : null}
                        >
                            {
                                tables && (
                                    Object.keys(tables).map((keys) => (
                                        <Option value={keys} key={keys}>{keys}</Option>
                                    ))
                                )
                            }
                        </Dropdown>
                    </div>
                </div>
                <h3 className="text-center">Data Is Migrating Source Table to Destination Table</h3>
                <div className="migrator-box">
                    <div className="form-input-row" >
                        <div className="migrat-col">
                            {
                                sourceColumns !== undefined && sourceColumns !== null && (
                                    sourceColumns.columns.map((sCOl) => (
                                        <InputText
                                            label="Desti. Column"
                                            value={sCOl}
                                            key={sCOl}
                                            readOnly={true}
                                        />
                                    ))
                                )
                            }
                        </div>
                        <div className="migrate-col" style={{ width: '40%' }}>
                            {
                                destinationColumn !== undefined && destinationColumn !== null && (
                                    destinationColumn.columns.map((col, index) => (
                                        <Dropdown
                                            placeholder="Source Column"
                                            optionFilterProp="children"
                                            onSelect={this.onProductSelect}
                                            size="large"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            classValue='inputField'
                                            key={index}
                                        >
                                            {
                                                destinationColumn !== undefined && destinationColumn !== null && (
                                                    destinationColumn.columns.map((dCol) => (
                                                        <Option value={dCol} key={dCol}>{dCol}</Option>
                                                    ))
                                                )
                                            }
                                        </Dropdown>
                                    ))
                                )
                            }
                        </div>
                        {/* <InputText
                            label="Default Value"
                            default="null"
                        /> */}
                    </div>
                    <div className="float-right"><Button color="primary" size="large">Migrate</Button></div>
                </div>
            </div>
        )
    }
}

export default Migrate