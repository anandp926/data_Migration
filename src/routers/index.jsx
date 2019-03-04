import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Drawer from '../components/drawer/drawer';
import CreateTable from '../pages/create_table';
import Tables from '../pages/tables';
import TableDetails from '../pages/tables/table';
import Migrate from '../pages/migrate'

class MainRouting extends Component {
    render() {
        return (
            <Switch>
                <Drawer>
                    <Route path="/" exact component={CreateTable} />
                    <Route path="/create-table" exact component={CreateTable} />
                    <Route path="/tables/:id" exact component={TableDetails} />
                    <Route path="/tables" exact component={Tables} />
                    <Route path="/migrate" exact component={Migrate} />
                </Drawer>
            </Switch>
        )
    }
}

export default MainRouting
