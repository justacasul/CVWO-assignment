import {Link} from "react-router-dom";
import React, {Component} from "react";

class TasksLink extends Component {

    render() {
        return (
            <div className="genericView">
                <h2>
                    <Link to="/Tasks">View Tasks</Link>
                </h2>
            </div>
        )
    }
}

export default TasksLink;