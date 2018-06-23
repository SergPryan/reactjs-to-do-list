import React, {Component} from 'react';
import {connect} from 'react-redux';
import Task from "./Task";

class App extends Component {

    constructor() {
        super();
        this.state = {rating: 0};
    }

    addTask() {
        console.log('app addTask');
        this.props.onIncrementIdTask();
        const name = this.inputName.value;
        const description = this.inputDescription.value;
        const rating = this.state.rating;
        const id = this.props.counterTask;
        this.props.onAddTask(id,name, description,rating);
        this.inputDescription.value = '';
        this.inputName.value = '';
    }

    filterAll() {
        this.props.onFilterTask(null);
    }

    filterNormal() {
        this.props.onFilterTask(0);
    }

    filterImportant() {
        this.props.onFilterTask(1);
    }

    filterVeryImportant() {
        this.props.onFilterTask(2);
    }
    handleChangeRating(e){
        this.setState({rating: Number(e.target.value)});
    }

    render() {
        return (
            <div>
                <div>
                    Name: <input type="text" ref={(input) => {this.inputName = input}}/> <br/>
                    Description: <input type="text" ref={(input) => {this.inputDescription = input}}/><br/>
                    Rating:
                    <select value={this.state.rating} onChange={this.handleChangeRating.bind(this)}>
                        <option value={0}>Normal</option>
                        <option value={1}>Important</option>
                        <option value={2}>Very Important</option>
                    </select>
                    <br/>
                    Date ended: <input type="date"/>
                    <br/>
                    <button onClick={this.addTask.bind(this)}>Add task</button>
                </div>
                <p>Filter:
                    <button onClick={this.filterAll.bind(this)}>All</button>
                    <button onClick={this.filterNormal.bind(this)}>Normal</button>
                    <button onClick={this.filterImportant.bind(this)}>Important</button>
                    <button onClick={this.filterVeryImportant.bind(this)}>Very important</button>
                </p>
                <ul>
                    {this.props.appStore.map((task, index) =>
                        <li key={task.id}><Task item={task}/></li>
                    )}
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        appStore: state.tasks.filter(task => (
            state.filterTask === null || task.rating === state.filterTask)),
        counterTask: state.counterTask}),
    dispatch => ({
        onAddTask: (id,name, description,rating) => {
            dispatch({type: 'ADD_TASK', payload: {name: name, description: description, rating: rating,id: id}});
        },
        onFilterTask: (rating) => {
            dispatch({type: 'FILTER_TASK', payload: rating})
        },
        onIncrementIdTask: () => {
            dispatch({type: 'COUNTER_TASK'});
        }
    })
)(App);