import React, {Component} from 'react';
import {connect} from 'react-redux';
import Task from "./Task";
import * as uuid from "uuid";

class App extends Component {

    constructor() {
        super();
        this.state = {rating: 0};
    }

    addTask() {
        const name = this.inputName.value;
        const description = this.inputDescription.value;
        const rating = this.state.rating;
        const dateEnded = this.inputDateEnded.value;
        const id = uuid.v4();
        this.props.onAddTask(id, name, description, rating, dateEnded);
        this.inputDescription.value = '';
        this.inputName.value = '';
        this.inputDateEnded.value = null;
    }

    render() {
        return (
            <div>
                <div>
                    Name: <input type="text" ref={(input) => {
                    this.inputName = input
                }}/> <br/>
                    Description: <input type="text" ref={(input) => {
                    this.inputDescription = input
                }}/><br/>
                    Rating:
                    <select value={this.state.rating} onChange={e=>this.setState({rating: Number(e.target.value)})}>
                        <option value={0}>Normal</option>
                        <option value={1}>Important</option>
                        <option value={2}>Very Important</option>
                    </select>
                    <br/>
                    Date ended: <input type="date" ref={(input) => {
                    this.inputDateEnded = input
                }}/>
                    <br/>
                    <button onClick={this.addTask.bind(this)}>Add task</button>
                </div>
                <p>Filter:
                    <Filter onFilterTask={this.props.onFilterTask} name="All" value="null"/>
                    <Filter onFilterTask={this.props.onFilterTask} name="Normal" value="0"/>
                    <Filter onFilterTask={this.props.onFilterTask} name="Important" value="1"/>
                    <Filter onFilterTask={this.props.onFilterTask} name="Very important" value="2"/>
                </p>
                <ul>
                    {this.props.appStore.map((task, index) =>
                        <li key={task.id}><Task item={task} onDeleteTask={this.props.onDeleteTask}
                                                onUpdateTask={this.props.onUpdateTask}/></li>
                    )}
                </ul>
            </div>
        );
    }
}

class Filter extends Component {
    render() {
        return (
            <button onClick={() => {
                this.props.onFilterTask(this.props.value)
            }}>{this.props.name}</button>
        );
    }
}


export default connect(
    state => ({
        appStore: state.tasks.filter(task => (
            state.filterTask === null || task.rating === state.filterTask))
    }),
    dispatch => ({
        onAddTask: (id, name, description, rating, dateEnded) => {
            dispatch({
                type: 'ADD_TASK', payload: {
                    name: name,
                    description: description,
                    rating: rating,
                    id: id,
                    dateEnded: dateEnded
                }
            });
        },
        onFilterTask: (rating) => {
            let result;
            if (rating === 'null') {
                result = null
            } else {
                result = Number(rating)
            }
            dispatch({type: 'FILTER_TASK', payload: result})
        },
        onDeleteTask: (id) => {
            dispatch({type: 'DELETE_TASK', payload: {id: id}});
        },
        onUpdateTask: (item) => {
            dispatch({type: 'UPDATE_TASK', payload: item});
        }
    })
)(App);