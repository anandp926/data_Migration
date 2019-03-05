import React, { Component } from 'react';
import SearchBar from '../../components/form/search_bar/search_bar';
import TableList from './table-list/table_list';
import { getTables } from '../../service/api/tables'

class Tables extends Component {
    state = {
        tables: [],
        query: ''
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
            this.setState({ query: '' })
        } else {
            this.setState({ query: query });
            // this.state.tables.map(book => (this.props.books.filter((bk) => bk.id === book.id).map(bk => book.shelf = bk.shelf)))
            // this.setState({ tables:  })
        }
    }

    render() {
        return (
            <div className="container">
                <SearchBar onSearchTable={this.onSearchTable} value={this.state.query} />
                <TableList tables={this.state.tables} />
            </div>
        )
    }
}

export default Tables