import React from 'react';
import { Component } from 'react';
import Navbar from './components/navbar';
import Users from './components/users';

class App extends Component {
  state = {  }
  render() {
    return ( 
      <div className="App">
        <Navbar />
        <div className="container">
          <Users />
        </div>
      </div>
     );
  }
}

export default App;
