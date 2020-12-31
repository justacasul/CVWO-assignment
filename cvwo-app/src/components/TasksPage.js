import {BrowserRouter, Link} from "react-router-dom";
import React, {Component} from "react";
import TasksContainer from "./TasksContainer";

class TasksPage extends Component {
    render(routes) {
        return (
            <div className="container">
                <div className="header">
                    <h1>Todos List</h1>
                </div>

                <div className="genericView">
                    <h2>
                        <Link to="/Categories">View Categories</Link>
                    </h2>
                </div>

                <div className="create">
                    <h3>
                        <Link to="/Tasks/new">New Todo</Link>
                    </h3>
                </div>

                <TasksContainer />

            </div>
        );
    }
}

export default TasksPage;