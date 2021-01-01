import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import {BrowserRouter, Link} from "react-router-dom";

class CategoriesContainer extends Component {

    // default constructor
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    // use axios to get all categories
    getCategories() {
        axios.get('/categoriess')
            .then(response => {
                this.setState({categories: response.data})
            })
            .catch(error => console.log(error))
    }

    // automatically get all tasks
    componentDidMount() {
        this.getCategories()
    }

    deleteCategory = (id) => {
        axios.delete(`/categories/${id}`)
            .then(response => {
                const categoryIndex = this.state.categories.findIndex(x => x.id === id)
                const categories = update(this.state.categories, {
                    $splice: [[categoryIndex, 1]]
                })
                this.setState({
                    categories: categories
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>

                <div className="listWrapper">
                    <ul className="categoryList">
                        {this.state.categories.map((category) => {
                            return(
                                <li className="category" category={category} key={category.id}>
                                    <label className="categoryLabel">
                                        <BrowserRouter>
                                            <Link to="/Categories/:id">{category.name}</Link>
                                        </BrowserRouter>
                                    </label>
                                    <button className="deleteBtn"
                                            onClick={(e) =>
                                                // console.log(task.id)
                                                this.deleteCategory(category.id)
                                            }>
                                        delete
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default CategoriesContainer
