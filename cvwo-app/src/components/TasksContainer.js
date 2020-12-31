import React, { Component } from 'react'
import axios from 'axios'

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

    render() {
        return (
            <div>
                <div className="listWrapper">
                    <ol className="taskList">
                        {this.state.tasks.map((task) => {
                            return(
                                <li className="task" task={task} key={task.id}>
                                    <label className="taskLabel">{task.name}</label>
                                    <span className="deleteTaskBtn">x</span>
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
