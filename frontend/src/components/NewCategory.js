import React, {Component} from "react";
import TasksLink from "./TasksLink";
import CategoriesLink from "./CategoriesLink";
import CategoryForm from "./CategoryForm";

class NewCategory extends Component {

    render() {
        return (
            <div>
                <h1 className="genericView">
                    New category
                </h1>
                <TasksLink/>
                <CategoriesLink/>
                <CategoryForm history={this.props.history}/>
            </div>
        );
    }
}

export default NewCategory;