import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import TaskPage from "./components/TaskPage";
import CategoryPage from "./components/CategoryPage";
import CategoriesPage from "./components/CategoriesPage";
import TasksPage from "./components/TasksPage";
import NewTask from "./components/NewTask";
import NewCategory from "./components/NewCategory";
import PageNotFound from "./components/PageNotFound";

class App extends Component {


  render() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" component={TasksPage} exact = {true}/>
                    <Route path="/Tasks" component={TasksPage} exact = {true}/>
                    <Route path="/Tasks/new" component={NewTask} exact = {true}/>
                    <Route path="/Tasks/null" component={PageNotFound} exact = {true}/>
                    <Route path="/Tasks/:id" component={TaskPage} exact = {true}/>
                    <Route path="/Categories" component={CategoriesPage} exact = {true}/>
                    <Route path="/Categories/new" component={NewCategory} exact = {true}/>
                    <Route path="/Categories/null" component={PageNotFound} exact = {true}/>
                    <Route path="/Categories/:id" component={CategoryPage} exact = {true}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}




export default App;