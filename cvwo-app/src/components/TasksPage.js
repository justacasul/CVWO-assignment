import {Link} from "react-router-dom";
import React, {Component} from "react";
import TasksContainer from "./TasksContainer";
import CategoriesLink from "./CategoriesLink";

class TasksPage extends Component {
    render(routes) {
        return (
            <div className="container">
                <div className="header">
                    <h1>Todos List</h1>
                </div>

                <CategoriesLink/>

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