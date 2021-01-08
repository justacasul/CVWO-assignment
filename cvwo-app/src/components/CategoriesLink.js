import {Link} from "react-router-dom";
import React, {Component} from "react";

class CategoriesLink extends Component {

    render() {
        return (
            <div className="genericView">
                <h2>
                    <Link to="/Categories">View Categories</Link>
                </h2>
            </div>
        )
    }
}

export default CategoriesLink;