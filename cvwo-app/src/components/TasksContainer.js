import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import {Link} from "react-router-dom";
import {formatDate} from "./FormatDateFunction";

class TasksContainer extends Component {

    // default constructor
    constructor(props) {
        super(props)

        this.state = {
            tasks: []
        }
    }

    // use axios to get all tasks
    getTasks() {
        axios.get('/tasks')
            .then(response => {
                this.setState({tasks: response.data})
            })
            .catch(error => console.log(error))
    }

    // automatically get all tasks
    componentDidMount() {
        this.getTasks()
    }



    // wow this really wasted 2-3 hours of my time because of
    // I didn't have
    // skip_before_action :verify_authenticity_token
    deleteTask = (id) => {
        axios.delete(`/tasks/${id}`)
            .then(response => {
                const taskIndex = this.state.tasks.findIndex(x => x.id === id)
                const tasks = update(this.state.tasks, {
                    $splice: [[taskIndex, 1]]
                })
                this.setState({
                    tasks: tasks
                })
            })
            .catch(error => console.log(error))
    }



    render() {
        return (
            <div>
                <div className="listWrapper">
                    <ol className="taskList">
                        {this.state.tasks.map((task) => {
                            return(
                                <li className="task" task={task} key={task.id}>
                                    <label className="taskLabel">
                                        <Link to={`/Tasks/${task.id}`}>{task.name}</Link>
                                    </label>
                                    <button className="deleteBtn"
                                          onClick={(e) =>
                                              this.deleteTask(task.id)
                                          }>
                                      delete
                                    </button>

                                    {/* float order*/}
                                    <span className="taskDue">
                                        Due {formatDate(task.due)}
                                    </span>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default TasksContainer
