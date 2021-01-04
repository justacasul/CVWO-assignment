import React, {Component} from "react";
import axios from "axios";
import {formatDate} from "./FormatDateFunction";
import TasksLink from "./TasksLink";
import {Link} from "react-router-dom";
import CategoriesLink from "./CategoriesLink";

class TaskPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {},
            categories: []
        };
    }

    // use axios to get all tasks
    getTask() {
        var id = this.props.match.params.id;
        axios.get('/tasks/' + id)
            .then(response => {
                this.setState({task: response.data})
            })
            .catch(error => console.log(error))

        axios.get('/tasks/' + id + '/categories/')
            .then(response => {
                this.setState({categories: response.data})
                this.setCategoriesMessage()
            })
            .catch(error => console.log(error))
    }

    setCategoriesMessage() {
        if(this.state.categories.length===0) {
            document.getElementById('has-categories').style.display = 'none';
        } else {
            document.getElementById('no-categories').style.display = 'none';
        }
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
                <TasksLink/>
                <CategoriesLink/>

                <div className="header">
                    <h1>{this.state.task.name}</h1>
                    <h4>by {formatDate(this.state.task.due)}</h4>
                </div>

                <div className="genericView">
                    <h3>{this.state.task.detail}</h3>
                </div>

                <div className="genericView">
                    <h3 id="has-categories">
                        This task belongs to the following categories:
                    </h3>

                    <h3 id="no-categories">
                        This task does not belong to any categories yet
                    </h3>
                    <div className="listWrapper">
                        <ul className="categoryList">
                            {this.state.categories.map((category) => {
                                return(
                                    <li className="category" category={category} key={category.id}>
                                        <label className="categoryLabel">
                                            <Link to={`/categories/${category.id}`}>{category.name}</Link>
                                        </label>
                                        <button className="deleteBtn"
                                                // TODO update by removing category from task
                                                // onClick={(e) =>
                                                //     this.deleteCategory(category.id)
                                                // }
                                        >
                                            remove category from task
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                {/* TODO: option to add category*/}


                <div className="create">
                    <h3>
                        <Link to="/Tasks/new">New Task</Link>
                    </h3>
                </div>

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