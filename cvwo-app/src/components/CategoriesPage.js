import {BrowserRouter, Link} from "react-router-dom";
import React, {Component} from "react";

class CategoriesPage extends Component {

    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>Categories List</h1>
                </div>

                <div className="genericView">
                    <h2>
                        <Link to="/Tasks">View Tasks</Link>
                    </h2>
                </div>

                {/*    add all categories here    */}

            </div>
        )
    }
}

export default CategoriesPage;