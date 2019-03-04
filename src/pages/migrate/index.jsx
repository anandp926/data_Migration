import React, { Component } from 'react';
import AutoSelect from '../../components/form/auto_select/auto_select';
import './migrate.css';
import InputText from '../../components/form/text-input/text_input'
import Button from '../../components/form/button/button'

class Migrate extends Component {
    render() {
        return (
            <div className="container">
                <h3 className="text-center">Select Tables for Data Migration</h3>
                <div className="migrate-table-selection">
                    <div className="migrate-table-selection-1">
                        <AutoSelect label="Select Table I" placeholder="Table Name" fullWidth={true} />
                    </div>
                    <div className="migrate-table-selection-2">
                        <AutoSelect label="Select Table II" placeholder="Table Name" fullWidth={true} />
                    </div>
                </div>
                <h3 className="text-center">Data Is Migrating From Table I to Table II</h3>
                <div className="migrator-box">
                    {
                        [0, 1, 2, 3, 4, 5, 6].map((index) => (
                            <div className="form-input-row" key={index}>
                                <InputText
                                    label="Column"
                                />
                                <AutoSelect label="Select Column From" placeholder="Table I" />
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