import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.css'

class Task extends Component{
    constructor(props) {
        super();
        const item = props.item;
        this.id=item.id;
        if(item.rating===undefined) { item.rating=0 }
        if(item.name===undefined) { item.name='default name' }
        if(item.description===undefined) { item.description='default description' }
        if(item.completed===undefined) { item.completed=false }
        this.state = {completed: item.completed, description: item.description, name: item.name, rating: item.rating,id:item.id,dateCompleted: item.dateCompleted};
    }

    updateTask(){
        this.props.onUpdateTask(this.state);
    }

    completedChange(){
        this.setState({completed: !this.state.completed, dateCompleted: Date.now()});
        if(this.state.completed === true){
            this.setState({dateCompleted: ''});
        }

    }

    onDescriptionChange(value) {
        this.setState({description: value});
    }

    onNameChange(value) {
        this.setState({name: value})
    }

    deleteTask(){
        this.props.onDeleteTask(this.id);
    }

    rating() {
        switch (this.state.rating) {
            case 0: return "normal" ;
            case 1: return "important";
            default: return "very important";
        }
    }

    handleChangeRating(e){
        this.setState({rating: Number(e.target.value)});
    }

    render() {
        return( <div className={"work " + (this.state.completed ? "completed" : "acting")}>
           <h3>Name:
               <input type="text" value={this.state.name} onChange={e => this.onNameChange(e.target.value)}/>
           </h3>
            <p>Description:
                <input type="text" value={this.state.description} onChange={e => this.onDescriptionChange(e.target.value)}/>
            </p>
            <p>Rating:
                <select value={this.state.rating} onChange={this.handleChangeRating.bind(this)}>
                    <option value={0}>Normal</option>
                    <option value={1}>Important</option>
                    <option value={2}>Very Important</option>
                </select>
            </p>
            <p>Date completion: {this.state.dateCompleted}</p>
            <p>
                <button onClick={this.completedChange.bind(this)}>Mark as Executed</button>
            </p>
            <p>
                <button onClick={this.updateTask.bind(this)}>Save</button>
                <button onClick={this.deleteTask.bind(this)}>Delete</button>
            </p>
          </div>);
    }
}

export default connect(
    state => ({
        appStore: state
    }),
    dispatch => ({
        onDeleteTask: (id) => {
            dispatch({type:'DELETE_TASK',payload:{id: id}});
        },
        onUpdateTask: (item) => {
            dispatch({type:'UPDATE_TASK',payload:item});
        }
    })
)(Task);