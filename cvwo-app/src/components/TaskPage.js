import React, {Component} from "react";
import axios from "axios";
import {formatDate} from "./FormatDateFunction";
import TasksLink from "./TasksLink";

class TaskPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {}
        };
    }

    // use axios to get all tasks
    getTask() {
        var id = this.props.match.params.id;
        console.log(id);
        axios.get('/tasks/' + id)
            .then(response => {
                this.setState({task: response.data})
            })
            .catch(error => console.log(error))
    }

    // automatically get all tasks
    componentDidMount() {
        this.getTask()
    }

    deleteTask = (id) => {
        axios.delete(`/tasks/${id}`)
            .then(response => {
                this.props.history.push('/');
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>{this.state.task.name}</h1>
                    <h4>by {formatDate(this.state.task.due)}</h4>
                </div>

                <div className="genericView">
                    <h3>{this.state.task.detail}</h3>
                </div>

                <TasksLink/>
                <br/>
                <div>
                    <button className="horizontalCenterDeleteBtn"
                            onClick={(e) =>
                                this.deleteTask(this.state.task.id)
                            }>
                        delete task
                    </button>
                </div>
            </div>


        )
    }
}

export default TaskPage;