import React, {Component} from "react";
import axios from "axios";
import {formatDate} from "./FormatDateFunction";
import TasksLink from "./TasksLink";
import {Link} from "react-router-dom";
import CategoriesLink from "./CategoriesLink";
import update from 'immutability-helper'
import Dropdown from 'react-bootstrap/Dropdown'
import PageNotFound from "./PageNotFound";
import MiniCategoryForm from "./MiniCategoryForm";

class TaskPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {},
            categories: [],
            allCategories: []
        };
    }

    // use axios to get all tasks
    getTask() {
        const id = this.props.match.params.id;
        axios.get('/tasks/' + id)
            .then(response => {
                this.setState({task: response.data})
            })
            .catch(error => {
                if(error.response.status === 404) {
                    this.set404()
                }
                console.log(error)
            })

    }

    getCategories() {
        const id = this.props.match.params.id;
        axios.get('/tasks/' + id + '/categories/')
            .then(response => {
                this.setState({categories: response.data})
                this.setCategoriesMessage()
            })
            .catch(error => console.log(error))
    }

    getAllCategories() {
        axios.get('/categories/')
            .then(response => {
                this.setState({allCategories: response.data})
            })
            .catch(error => console.log(error))
    }

    set404() {
        document.getElementById('notFound').style.display = '';
        document.getElementById('pageFound').style.display = 'none';
    }

    setCategoriesMessage() {
        if(this.state.categories.length===0) {
            document.getElementById('has-categories').style.display = 'none';
            document.getElementById('no-categories').style.display = '';
        } else {
            document.getElementById('no-categories').style.display = 'none';
            document.getElementById('has-categories').style.display = '';
        }
    }

    // automatically get all tasks
    componentDidMount() {
        this.getTask()
        this.getCategories()
        this.getAllCategories()
    }

    deleteTask = () => {
        axios.delete(`/tasks/${this.state.task.id}`)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(error => console.log(error))
    }

    removeCategoryFromTask = (category_id) => {
        axios.delete(
            `/tasks/${this.state.task.id}/categories/${category_id}`)
            .then(() => {
                const categoryIndex =
                    this.state.categories.findIndex(
                        x => x.id === category_id)
                const categories = update(this.state.categories, {
                    $splice: [[categoryIndex, 1]]
                })
                this.setState({
                    categories: categories
                })
                this.setCategoriesMessage()
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
                        <h1>{this.state.task.name}</h1>
                        {this.state.task.due
                            ?<h4>by {formatDate(this.state.task.due)}</h4>
                            :<h4/>
                        }
                    </div>

                    <div className="genericView">
                        <h3>{this.state.task.detail}</h3>
                    </div>

                    <div className="genericView">
                        <h3 id="has-categories" style={{display: 'none'}}>
                            This task belongs to the following categories:
                        </h3>

                        <h3 id="no-categories">
                            This task does not belong to any categories yet
                        </h3>
                        <div className="listWrapper">
                            <ul className="categoryList">
                                {this.state.categories.map((category) => {
                                    return(
                                        <li className="miniCategory" category={category} key={category.id}>
                                            <label className="categoryLabel">
                                                <Link to={`/categories/${category.id}`}>{category.name}</Link>
                                            </label>
                                            <button className="deleteBtn"
                                                    onClick={(e) =>
                                                        this.removeCategoryFromTask(category.id)
                                                    }
                                            >
                                                remove category from task
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <MiniCategoryForm task={this.state.task} updateCategories={this.getCategories()}/>

                    <Dropdown className="genericView">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Add an existing category to the task
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.allCategories
                                .filter(
                                    ( presentCategory ) => this.state.categories.findIndex(
                                        x => x.id === presentCategory.id) < 0
                                ).map(
                                    (remainingCategory) => {
                                        return(
                                            <Dropdown.Item key={remainingCategory.id}
                                                onClick={(e) =>
                                                    axios.put(
                                                        `/tasks/${this.state.task.id}/categories/${remainingCategory.id}`)
                                                        .then(() =>
                                                            this.getCategories()
                                                        )
                                                }
                                            >
                                                {remainingCategory.name}
                                            </Dropdown.Item>
                                )})}
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="create">
                        <h3>
                            <Link to="/Tasks/new">New Task</Link>
                        </h3>
                    </div>

                    <br/>
                    <div>
                        <button className="horizontalCenterDeleteBtn"
                                onClick={(e) =>
                                    this.deleteTask()
                                }>
                            delete task
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}

export default TaskPage;