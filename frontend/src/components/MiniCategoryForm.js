import React from "react";
import axios from "axios";

class MiniCategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(`/tasks/${this.props.task.id}/categories`,
            {
                name: this.state.categoryName
            }
        )
            .then(
                () => this.props.updateCategories
        )
            .catch(error => console.log(error))
    }

    render() {
        return (
            <form
                className="genericView"
                onSubmit={this.handleSubmit}>
                <label>
                    Create and add a new category:
                    <input className="categoryName"
                           required="required"
                           name="categoryName"
                           type="text"
                           maxLength="50"
                           onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default MiniCategoryForm;