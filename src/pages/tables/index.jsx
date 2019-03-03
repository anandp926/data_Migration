import React, { Component } from 'react';
import SearchBar from '../../components/form/search_bar/search_bar';
import TableList from './table-list/table_list'

class Tables extends Component {
    render() {
        return(
            <div className="container">
                <SearchBar/>
                <TableList/>
            </div>
        )
    }
}

export default Tables