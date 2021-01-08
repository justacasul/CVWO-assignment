import React from "react";
import axios from "axios";

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            taskDetail: '',
            taskDay: '',
            taskMonth: '',
            taskYear: '',
            taskHour: '',
            taskMinute: ''
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
        const due = this.generateDue()
        axios.post('/tasks',
                    {
                        name: this.state.taskName,
                        detail: this.state.taskDetail
                        ,
                        due: due
                    }
                )
            .then(response =>
                this.props.history.push('/tasks/' + response.data.id)
            )
            .catch(error => console.log(error))
    }

    generateDue() {
        // DD MM present
        let tempYear;
        let tempHour;
        let tempMinute;
        if(this.dateCheck()) {
            // YYYY present
            if(this.state.taskYear) {
                // do nothing
                tempYear = this.state.taskYear
            } else {
                // set current year as default
                tempYear = new Date().getFullYear()
            }
            if(this.timeCheck()) {
                tempHour = this.state.taskHour
                tempMinute = this.state.taskMinute
            } else {
                // set default time
                tempHour = 0
                tempMinute = 0
            }
            return new Date(tempYear,
                this.state.taskMonth - 1,
                this.state.taskDay,
                tempHour,
                tempMinute)

        } else {
            // should be 1970 or something
            return null;
        }
    }

    dateCheck() {
        return (this.state.taskDay && this.state.taskMonth);
    }

    timeCheck() {
        return (this.state.taskHour && this.state.taskMinute);
    }

    render() {
        return (
            <form
                className="genericView"
                onSubmit={this.handleSubmit}>
                <label>
                    <input className="taskName"
                        required="required"
                        placeholder="Name of task"
                        name="taskName"
                        type="text"
                        maxLength="50"
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <br />
                <label>
                    <textarea className="taskDetail"
                        placeholder="Task details"
                        name="taskDetail"
                        maxLength="500"
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <br />
                <label>
                    Due date:
                    <input className="dueDate"
                        placeholder="DD"
                        name="taskDay"
                        type="number"
                        min="1"
                        max="31"
                        onChange={this.handleInputChange} />
                </label>
                /
                <label>
                    <input className="dueDate"
                        placeholder="MM"
                        name="taskMonth"
                        type="number"
                        min="1"
                        max="12"
                        onChange={this.handleInputChange} />
                </label>
                /
                <label>
                    <input className="dueDate"
                        placeholder="YYYY"
                        name="taskYear"
                        type="number"
                        min="2020"
                        max="2100"
                        onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                    Due time:
                    <input className="dueTime"
                        placeholder="HH"
                        name="taskHour"
                        type="number"
                        min="0"
                        max="23"
                        onChange={this.handleInputChange} />
                </label>
                :
                <label>
                    <input className="dueTime"
                        placeholder="MM"
                        name="taskMinute"
                        type="number"
                        min="0"
                        max="59"
                        onChange={this.handleInputChange} />
                </label>
                <br/>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default TaskForm;