import React, {Component} from "react";
import axios from "axios";
import update from "immutability-helper";
import {Link} from "react-router-dom";
import {formatDate} from "./FormatDateFunction";
import CategoriesLink from "./CategoriesLink";
import TasksLink from "./TasksLink";
import Dropdown from "react-bootstrap/Dropdown";
import PageNotFound from "./PageNotFound";

class CategoryPage extends Component {

    // default constructor
    constructor(props) {
        super(props)

        this.state = {
            category: {},
            tasks: [],
            allTasks: []
        }
    }

    getCategory() {
        const id = this.props.match.params.id;
        axios.get('/categories/'+ id)
            .then(response => {
                this.setState({category: response.data})
            })
            .catch(error => {
                if(error.response.status === 404) {
                    this.set404()
                }
                console.log(error)
            })
    }

    // use axios to get all tasks
    getTasks() {
        const id = this.props.match.params.id;
        axios.get('/categories/'+ id +'/tasks')
            .then(response => {
                this.setState({tasks: response.data})
            })
            .catch(error => console.log(error))
    }

    getAllTasks() {
        axios.get('/tasks/')
            .then(response => {
                this.setState({allTasks: response.data})
            })
            .catch(error => console.log(error))
    }

    set404() {
        document.getElementById('notFound').style.display = '';
        document.getElementById('pageFound').style.display = 'none';
    }

    // automatically get all tasks
    componentDidMount() {
        this.getCategory()
        this.getTasks()
        this.getAllTasks()
    }

    removeTaskFromCategory = (task_id) => {
        axios.delete(`/categories/${this.state.category.id}/tasks/${task_id}`)
            .then(() => {
                const taskIndex = this.state.tasks.findIndex(x => x.id === task_id)
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
                <TasksLink/>
                <CategoriesLink/>

                <div id="notFound" style={{display: 'none'}}>
                    <PageNotFound/>
                </div>

                <div id="pageFound">
                    <div className="header">
                        <h1>Tasks under {this.state.category.name}</h1>
                    </div>


                    <Dropdown className="genericView">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Add an existing task to the category
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.allTasks
                                .filter(
                                    ( presentTask ) => this.state.tasks.findIndex(
                                        x => x.id === presentTask.id) < 0
                                ).map(
                                    (remainingTask) => {
                                        return(
                                            <Dropdown.Item key={remainingTask.id}
                                                onClick={(e) =>
                                                    axios.put(
                                                        `/categories/${this.state.category.id}/tasks/${remainingTask.id}`)
                                                        .then(() =>
                                                            this.getTasks()
                                                        )
                                                }
                                            >
                                                {remainingTask.name}
                                            </Dropdown.Item>
                                        )})}
                        </Dropdown.Menu>
                    </Dropdown>

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
                                                    this.removeTaskFromCategory(task.id)
                                                }
                                        >
                                            remove task from category
                                        </button>

                                        {/* float order*/}
                                        {task.due ?
                                            <span className="taskDue">
                                                Due {formatDate(task.due)}
                                            </span>
                                            :
                                            <span></span>
                                        }
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryPage;