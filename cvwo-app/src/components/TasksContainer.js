import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import {BrowserRouter, Link} from "react-router-dom";

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

    formatDate = (date) => {
        const recreatedDate = new Date(date)
        const day = recreatedDate.getDate();
        const month = recreatedDate.getMonth() + 1;
        const year = recreatedDate.getFullYear();
        const hour = recreatedDate.getHours();
        const minute = recreatedDate.getMinutes();
        return day + "/" + month + "/" + year + " " + hour + ":" + minute;
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
                                        <BrowserRouter>
                                            <Link to="/Tasks/:id">{task.name}</Link>
                                        </BrowserRouter>
                                    </label>
                                    <button className="deleteTaskBtn"
                                          onClick={(e) =>
                                              // console.log(task.id)
                                              this.deleteTask(task.id)
                                          }>
                                      delete
                                    </button>

                                    {/* float order*/}
                                    <span className="taskDue">
                                        Due {this.formatDate(task.due)}
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
