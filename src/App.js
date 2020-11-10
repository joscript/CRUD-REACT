import React from 'react';
import { Component } from 'react';
import Navbar from './components/navbar';
import Users from './components/users';

import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
    return ( 
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <div className="container">
            <Users />
          </div>
        </div>
      </Provider>
    );
}

export default App;
