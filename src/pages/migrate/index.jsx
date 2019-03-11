import React, { Component } from 'react';
import './migrate.css';
import InputText from '../../components/form/text-input/text_input'
import Buttons from '../../components/form/button/button';
import { getTables, getTablesData, migrateTable } from '../../service/api/tables';
import { Select, Modal, Button } from 'antd';
import Dropdown from '../../components/form/auto_select/auto_select'

const Option = Select.Option;

function success() {
    Modal.success({
        title: 'Data Migrated',
        content: 'Source to Destination Table',
    });
}

class Migrate extends Component {
    state = {
        tables: [],
        sourceTable: '',
        destinationTable: '',
        selectedSourceCol: [],
        srcTableData: [],
        destTableData: []
    }

    onSourceTableSelect = (value) => {
        this.setState({ sourceTable: value }, () => {
            if (this.state.sourceTable) {
                getTablesData(this.srcTablesDataCallback, this.state.sourceTable)
            }
        })
    }

    onDestinationTableSelect = (value) => {
        this.setState({ destinationTable: value }, () => {
            if (this.state.sourceTable) {
                getTablesData(this.destTablesDataCallback, this.state.destinationTable)
            }
        })
    }

    onSourceColumnSelect = (value) => {
        const values = value.split('-');
        this.state.selectedSourceCol[values[1]] = values[0];
        this.setState({ selectedSourceCol: this.state.selectedSourceCol })
        // console.log(value.split('-'))
    }

    onMigrateCallback = (data) => {
        if (data.status === 201) {
            console.log(data.data)
            success();
        }
    }

    onMigrate = () => {
        if (this.state.srcTableData && this.state.destinationTable) {
            const imgSourceData = this.state.destTableData;
            this.state.srcTableData.map((data) => {
                var obj = {}
                if (this.state.selectedSourceCol) {
                    this.state.tables[this.state.destinationTable].columns.map((key, index) => {
                        obj[key] = data[this.state.selectedSourceCol[index]]
                    })
                    imgSourceData.push(obj)
                }
            })
            const newData = {
                data: imgSourceData
            }
            // console.log(imgSourceData)
            migrateTable(this.onMigrateCallback, newData, this.state.destinationTable)
        }
    }

    //  tables call
    destTablesDataCallback = (data) => {
        if (data.status === 200) {
            this.setState({ destTableData: data.data.data })
        }
    }

    srcTablesDataCallback = (data) => {
        if (data.status === 200) {
            this.setState({ srcTableData: data.data.data })
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

        const { tables, sourceTable, destinationTable, selectedSourceCol } = this.state;
        let sourceColumns, destinationColumn, error = 0;
        if (tables && sourceTable) {
            sourceColumns = tables[sourceTable]
        }
        if (tables && destinationTable) {
            destinationColumn = tables[destinationTable]
        }

        if (sourceTable && destinationTable) {
            if (sourceTable === destinationTable) {
                error = 1
            }
        }
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
                {
                    sourceTable || destinationTable
                        ?
                        <div className="migrator-box">
                            {
                                error !== 1
                                    ?
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
                                    </div>
                                    : <div style={{ color: 'red' }}><strong>Source and Destination table can't be same</strong></div>
                            }
                            {
                                this.state.sourceTable && this.state.destinationTable && tables[destinationTable].columns.length === selectedSourceCol.length
                                    ? <div className="float-right"><Buttons color="primary" size="large" onClick={this.onMigrate}>Migrate</Buttons></div>
                                    : null
                            }
                        </div>
                        : null
                }

            </div>
        )
    }
}

export default Migrate