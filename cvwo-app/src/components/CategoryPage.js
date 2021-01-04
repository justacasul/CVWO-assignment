import React, {Component} from "react";
import axios from "axios";
import update from "immutability-helper";
import {Link} from "react-router-dom";
import {formatDate} from "./FormatDateFunction";
import CategoriesLink from "./CategoriesLink";
import TasksLink from "./TasksLink";

class CategoryPage extends Component {

    // default constructor
    constructor(props) {
        super(props)

        this.state = {
            category: {},
            tasks: []
        }
    }

    // use axios to get all tasks
    getTasks() {
        var id = this.props.match.params.id;
        axios.get('/categories/'+ id)
            .then(response => {
                this.setState({category: response.data})
            })
            .catch(error => console.log(error))

        axios.get('/categories/'+ id +'/tasks')
            .then(response => {
                this.setState({tasks: response.data})
            })
            .catch(error => console.log(error))
    }

    // automatically get all tasks
    componentDidMount() {
        this.getTasks()
    }

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
                <div className="header">
                    <h1>Tasks under {this.state.category.name}</h1>
                </div>

                <TasksLink/>

                <CategoriesLink/>

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

export default CategoryPage;