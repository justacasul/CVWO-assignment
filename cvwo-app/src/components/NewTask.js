import {Link} from "react-router-dom";
import React, {Component} from "react";
import axios from "axios";

class TasksPage extends Component {
    createTodo = (e) => {
        axios.post('/tasks', {task: {}
                // figure out how to get inputs
                // {name: e.nameInput.value}
        })
            .then(response => {
            //    somehow redirect back to home page
            })
            .catch(error => console.log(error))

    }

    render(routes) {
        return (
            <form className="taskInput">
                <input className="nameInput" type="text"
                       placeholder="Name of task" maxLength="50"/><br />
                <input className="detailInput" type="text"
                       placeholder="Task details" maxLength="500"/><br />
                <input className="dueDayInput" type="number"
                       placeholder="DD" maxLength="2"/>
                       /
                <input className="dueMonthInput" type="number"
                       placeholder="MM" maxLength="2"/>
                       /
                <input className="dueYearInput" type="number"
                       placeholder="YYYY (empty for current year)" maxLength="4"/><br />
                <input className="dueHourInput" type="number"
                       placeholder="HH (empty for 00)" maxLength="2"/>
                       :
                <input className="dueMinuteInput" type="number"
                       placeholder="MM (empty for 00)" maxLength="2"/><br />
                <button>
                   add task
                </button>
            </form>
        );
    }
}

export default TasksPage;