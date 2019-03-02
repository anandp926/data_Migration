import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Drawer from '../components/drawer/drawer';
import CreateTable from '../pages/create_table';
import Tables from '../pages/tables';

class MainRouting extends Component {
    render(){
        return(
            <Switch>
                <Drawer>
                    <Route path="/" exact component={CreateTable} />
                    <Route path="/create-table" exact component={CreateTable} />
                    <Route path="/tables" exact component={Tables}/>
                </Drawer>
            </Switch>
        )
    }
}

export default MainRouting
