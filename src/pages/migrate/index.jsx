import React, { Component } from 'react';
import './migrate.css';
import InputText from '../../components/form/text-input/text_input'
import Button from '../../components/form/button/button';
import { getTables } from '../../service/api/tables';
import deburr from 'lodash/deburr';
import { Select } from 'antd';
import Dropdown from '../../components/form/auto_select/auto_select'

const Option = Select.Option;

class Migrate extends Component {
    state = {
        tables: [],
        sourceValue: '',
        sourceSuggestions: [],
    }

    // source Dropdown

    getSuggestions(value) {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0 && !this.state.tables
            ? []
            : Object.keys(this.state.tables).filter(suggestion => {
                const keep =
                    count < 5 && suggestion.toLowerCase().match(inputValue);

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (e) => {
        console.log(e)
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

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
        return (
            <div className="container">
                <h3 className="text-center">Select Tables for Data Migration</h3>
                <div className="migrate-table-selection">
                    <div className="migrate-table-selection-1">
                        <Dropdown
                            labelName="Product"
                            placeholder="Select Product"
                            optionFilterProp="children"
                            onSelect={this.onProductSelect}
                            size="large"
                            isRequired={true}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            classValue={this.state.productIdWarn ? 'inputField-outline' : null}
                        >
                            <Option value={21} key={24}>testing</Option>
                        </Dropdown>
                    </div>
                    <div className="migrate-table-selection-2">
                        <Dropdown suggestions={this.state.tables} label="Desti. Table" placeholder="Table Name" fullWidth={true} />
                    </div>
                </div>
                <h3 className="text-center">Data Is Migrating Source Table to Destination Table</h3>
                <div className="migrator-box">
                    {
                        [0, 1, 2, 3, 4, 5, 6].map((index) => (
                            <div className="form-input-row" key={index}>
                                <InputText
                                    label="Desti. Column"
                                />
                                <Dropdown label="Select Source Column" placeholder="Source Table" />
                                <InputText
                                    label="Default Value"
                                    default="null"
                                />
                            </div>
                        ))
                    }
                    <div className="float-right"><Button color="primary" size="large">Migrate</Button></div>
                </div>
            </div>
        )
    }
}

export default Migrate