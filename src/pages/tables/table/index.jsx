import React, { Component } from 'react';
import './table.css';
import { getTablesData, getTables } from '../../../service/api/tables';
import Button from '../../../components/form/button/button';
import FormDialog from '../../../components/dialog/dialog'
import AddRow from './add_row/add_row';
import AddColumn from './add_coloumn/add_coloumn'

class TableDetails extends Component {
    state = {
        tables: [],
        tableData: [],
        url: this.props.location.pathname.split('/')[2],
        colOpen: false,
        rowOpen: false
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

    handleClickColOpen = () => {this.setState({colOpen: true})}

    handleClickRowOpen = () => {
        this.setState({ rowOpen: true });
      };
    
      handleClose = () => {
        this.setState({ rowOpen: false, colOpen:false });
      };

    render() {
        let columns;
        if (this.state.tables && this.state.url) {
            columns = this.state.tables[this.state.url]
        }

        return (
            <div className="container">
                <FormDialog 
                    open={this.state.rowOpen || this.state.colOpen}
                    title={this.state.rowOpen ? 'Add Row' : 'Add Column'}
                >
                    {
                        this.state.rowOpen
                        ?
                        <AddRow 
                            handleClose={this.handleClose}
                            columns={columns}
                            tableName={this.state.url}
                            tableData={this.state.tableData}
                        />
                        :
                        <AddColumn
                            handleClose={this.handleClose}
                            columns={columns}
                            tableName={this.state.url}
                            tables={this.state.tables}
                        />
                    }
                </FormDialog>
                <div className="button-group">
                <Button 
                    color="primary" 
                    size="large"
                    onClick={this.handleClickRowOpen}
                >Add Row</Button>
                <Button 
                    color="secondary" 
                    size="large"
                    onClick={this.handleClickColOpen}
                >Add Column</Button>
                </div>
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
                                this.state.tableData && columns !== undefined && columns !== null &&(
                                    this.state.tableData.map((data) => (
                                        <tr key={data.id}>
                                        {
                                            columns.columns.map((col) => (
                                                <td key={col}>{data[col]}</td>
                                            ))
                                        }
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