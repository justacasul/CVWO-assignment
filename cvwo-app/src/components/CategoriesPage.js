import React, {Component} from "react";
import TasksLink from "./TasksLink";
import CategoriesContainer from "./CategoriesContainer";

class CategoriesPage extends Component {

    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>Categories List</h1>
                </div>

                <TasksLink />

                <CategoriesContainer />

            </div>
        )
    }
}

export default CategoriesPage;