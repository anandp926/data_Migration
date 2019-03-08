import React, { Component } from 'react';
import './migrate.css';
import InputText from '../../components/form/text-input/text_input'
import Button from '../../components/form/button/button';
import { getTables, getTablesData } from '../../service/api/tables';
import { Select } from 'antd';
import Dropdown from '../../components/form/auto_select/auto_select'

const Option = Select.Option;
var a;
class Migrate extends Component {
    state = {
        tables: [],
        sourceTable: '',
        destinationTable: '',
        selectedSourceCol: [],
        tableData: []
    }

    onSourceTableSelect = (value) => {
        this.setState({ sourceTable: value }, () => {
            if (this.state.sourceTable) {
                getTablesData(this.tablesDataCallback, this.state.sourceTable)
            }
        })
    }

    onDestinationTableSelect = (value) => {
        this.setState({ destinationTable: value })
    }

    onSourceColumnSelect = (value) => {
        const values = value.split('-');
        this.state.selectedSourceCol[values[1]] = values[0];
        this.setState({ selectedSourceCol: this.state.selectedSourceCol }, () => console.log(this.state.selectedSourceCol))
        // console.log(value.split('-'))
    }

    onMigrate = () => {
        if (this.state.tableData) {
            const imgSourceData = this.state.tableData;
            a = imgSourceData.map((isd) => {
                Object.keys(isd).map((isdKey) => {
                    if (this.state.selectedSourceCol) {
                        this.state.selectedSourceCol.map((key, index) => {
                            if (isdKey === key) {
                                if (this.state.tables[this.state.destinationTable].columns) {
                                    const newKey = this.state.tables[this.state.destinationTable].columns[index];
                                    return { [newKey]: isdKey[key] };
                                }
                            }
                        })
                    }
                })
            })
        }
    }

    //  tables call
    tablesDataCallback = (data) => {
        if (data.status === 200) {
            this.setState({ tableData: data.data.data })
        }
    }

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
                                destinationColumn !== undefined && destinationColumn !== null && (
                                    destinationColumn.columns.map((dCOl) => (
                                        <InputText
                                            label="Desti. Column"
                                            value={dCOl}
                                            key={dCOl}
                                            readOnly={true}
                                        />
                                    ))
                                )
                            }
                        </div>
                        <div className="migrate-col" style={{ width: '40%' }}>
                            {
                                sourceColumns !== undefined && sourceColumns !== null && (
                                    sourceColumns.columns.map((col, index) => (
                                        <Dropdown
                                            placeholder="Source Column"
                                            optionFilterProp="children"
                                            onSelect={this.onSourceColumnSelect}
                                            size="large"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            classValue='inputField'
                                            key={index}
                                        >
                                            {
                                                sourceColumns !== undefined && sourceColumns !== null && (
                                                    sourceColumns.columns.map((sCol) => (
                                                        <Option value={`${sCol}-${index}`} key={sCol}>{sCol}</Option>
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
                    <div className="float-right"><Button color="primary" size="large" onClick={this.onMigrate}>Migrate</Button></div>
                </div>
            </div>
        )
    }
}

export default Migrate