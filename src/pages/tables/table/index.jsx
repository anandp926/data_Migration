import React, { Component } from 'react';
import './table.css';
import { getTablesData, getTables } from '../../../service/api/tables'

class TableDetails extends Component {
    state = {
        tables: [],
        tableData: [],
        url: this.props.location.pathname.split('/')[2]
    }

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
        if (this.state.url) {
            getTablesData(this.tablesDataCallback, this.state.url)
        }
    }
    render() {
        let columns;
        if (this.state.tables && this.state.url) {
            columns = this.state.tables[this.state.url]
        }

        return (
            <div className="container">
                <div className="db-table" style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                {
                                    columns !== undefined && columns !== null && (
                                        columns.columns.map((col) => (
                                            <th key={col}>{col.toUpperCase()}</th>
                                        ))
                                    )
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tableData && (
                                    this.state.tableData.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.password}</td>
                                            <td>{data.location}</td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableDetails