import React, {Component} from "react";
import TasksLink from "./TasksLink";
import CategoriesContainer from "./CategoriesContainer";
import {Link} from "react-router-dom";

class CategoriesPage extends Component {

    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>Categories List</h1>
                </div>

                <TasksLink />

                <div className="create">
                    <h3>
                        <Link to="/Categories/new">New Category</Link>
                    </h3>
                </div>

                <CategoriesContainer />

            </div>
        )
    }
}

export default CategoriesPage;