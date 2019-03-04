import React, { Component } from 'react';
import AutoSelect from '../../components/form/auto_select/auto_select';
import './migrate.css';
import InputText from '../../components/form/text-input/text_input'

class Migrate extends Component {
    render() {
        return (
            <div className="container">
                <div className="migrate-table-selection">
                    <div className="migrate-table-selection-1">
                        <AutoSelect fullWidth={true} />
                    </div>
                    <div className="migrate-table-selection-2">
                        <AutoSelect fullWidth={true} />
                    </div>
                </div>
                <div className="migrator-box">
                    {
                        [0, 1, 2, 3, 4, 5, 6].map((index) => (
                            <div className="form-input-row" key={index}>
                                <InputText
                                    label="Column"
                                />
                                <AutoSelect />
                                <InputText
                                    label="Default Value"
                                    default="null"
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Migrate