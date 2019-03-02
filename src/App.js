import React, { Component } from 'react';
import Drawer from './components/drawer/drawer';
import Home from './components/pages/home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Drawer>
          <Home/>
        </Drawer>
      </div>
    );
  }
}

export default App;
