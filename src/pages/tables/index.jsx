import React, { Component } from 'react';
import SearchBar from '../../components/form/search_bar/search_bar';
import TableList from './table-list/table_list';
import { getTables } from '../../service/api/tables'

class Tables extends Component {
    state = {
        tables: [],
        query: '',
        searchResult: []
    }

    tablesCallback = (data) => {
        if (data.status === 200) {
            this.setState({ tables: data.data })
        }
    }

    componentDidMount() {
        getTables(this.tablesCallback);
    }

    onSearchTable = (query) => {
        if (!query) {
            this.setState({ query: '', searchResult: [] })
        } else {
            let filterSearch;
            this.setState({ query: query }, () => {
                if (this.state.tables && this.state.query) {
                    filterSearch = Object.keys(this.state.tables).filter((key) => key.toLowerCase().match(this.state.query.toLowerCase()));
                    this.setState({ searchResult: filterSearch });
                }
            });

        }
    }

    render() {
        return (
            <div className="container">
                <SearchBar onSearchTable={this.onSearchTable} value={this.state.query} />
                <TableList tables={this.state.tables} searchTable={this.state.searchResult} />
            </div>
        )
    }
}

export default Tables