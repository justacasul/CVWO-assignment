import React, {Component} from "react";
import TasksLink from "./TasksLink";
import CategoriesLink from "./CategoriesLink";
import TaskForm from "./TaskForm";

class NewTask extends Component {

    render() {
        return (
            <div>
                <h1 className="genericView">
                    New task
                </h1>
                <TasksLink/>
                <CategoriesLink/>
                {/* yep this does the trick*/}
                <TaskForm history={this.props.history}/>
            </div>
        );
    }
}

export default NewTask;