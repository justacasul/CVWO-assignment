import React, { Component } from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import './App.css';
import TasksContainer from './components/TasksContainer'

class App extends Component {
  render() {
    return (
        <div className="container">
          <div className="header">
            <h1>Todos List</h1>
          </div>

          <div className="create">
              <h2>
                  <BrowserRouter>
                    {/*  edit link later*/}
                    <Link to="/Tasks/">New Todo</Link>
                  </BrowserRouter>
              </h2>
          </div>

          <TasksContainer />
        </div>
    );
  }
}

export default App;