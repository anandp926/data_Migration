import React, { Component } from 'react';
import './table.css'

class TableDetails extends Component {
    render() {
        return (
            <div className="container">
                <div className="db-table" style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Points</th>
                                <th>Points</th>
                                <th>Points</th>
                                <th>Points</th>
                                <th>Points</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                                    <tr key={index}>
                                        <td>Eve</td>
                                        <td>Jackson</td>
                                        <td>94</td>
                                        <td>94</td>
                                        <td>94</td>
                                        <td>94</td>
                                        <td>94</td>
                                        <td>94</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableDetails