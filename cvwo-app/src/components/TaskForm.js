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
        if(this.dateCheck()) {
            // YYYY present
            if(this.state.taskYear) {
                // do nothing
            } else {
                // set current year as default
                this.state.taskYear = new Date().getFullYear()
                console.log(this.state.taskYear)
            }
            if(this.timeCheck()) {
                // do nothing
            } else {
                // set default time
                this.state.taskHour = 0
                this.state.taskMinute = 0
            }

            return new Date(this.state.taskYear,
                this.state.taskMonth - 1,
                this.state.taskDay,
                this.state.taskHour,
                this.state.taskMinute)

        } else {
            // should be 1970 or something
            return null;
        }
    }

    dateCheck() {
        return !!(this.state.taskDay && this.state.taskMonth);
    }

    timeCheck() {
        return !!(this.state.taskHour && this.state.taskMinute);
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
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <br />
                <label>
                    <textarea className="taskDetail"
                        placeholder="Task details"
                        name="taskDetail"
                        maxLength="500"
                        value={this.state.detail}
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
                        value={this.state.day}
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
                        value={this.state.month}
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
                        value={this.state.year}
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
                        value={this.state.hour}
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
                        value={this.state.minute}
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