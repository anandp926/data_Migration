import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Drawer from '../components/drawer/drawer';
import CreateTable from '../pages/create_table';
import Tables from '../pages/tables';
import TableDetails from '../pages/tables/table';
import Migrate from '../pages/migrate';
import LoginTemp from '../login/login_temp';
import LoginChecker from '../login/login-checker';

class MainRouting extends Component {
    render() {
        return (
            <Switch>
                <Drawer>
                    <Route path="/" exact component={LoginTemp} />
                    <LoginChecker>
                        <Route path="/create-table" exact component={CreateTable} />
                        <Route path="/tables/:id" exact component={TableDetails} />
                        <Route path="/tables" exact component={Tables} />
                        <Route path="/migrate" exact component={Migrate} />
                    </LoginChecker>
                </Drawer>
            </Switch>
        )
    }
}

export default MainRouting
