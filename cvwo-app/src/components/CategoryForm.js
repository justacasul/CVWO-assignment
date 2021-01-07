import React from "react";
import axios from "axios";

class CategoryForm extends React.Component {
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
        axios.post('/categories',
            {
                name: this.state.categoryName
            }
        )
            .then(response =>
                this.props.history.push('/categories/' + response.data.id)
            )
            .catch(error => console.log(error))
    }

    render() {
        return (
            <form
                className="genericView"
                onSubmit={this.handleSubmit}>
                <label>
                    Name of category:
                    <input className="categoryName"
                           required="required"
                           name="categoryName"
                           type="text"
                           maxLength="50"
                           onChange={this.handleInputChange} />
                </label>
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default CategoryForm;