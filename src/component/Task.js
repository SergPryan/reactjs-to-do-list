import React, {Component} from 'react';
import '../css/index.css'

class Task extends Component{
    constructor(props) {
        super();
        const item = props.item;
        if(item.rating===undefined) { item.rating=0 }
        if(item.name===undefined) { item.name='default name' }
        if(item.description===undefined) { item.description='default description' }
        if(item.completed===undefined) { item.completed=false }
        this.state = {completed: item.completed, description: item.description, name: item.name, rating: item.rating,id:item.id,dateCompleted: item.dateCompleted,dateEnded:item.dateEnded};
    }

    completedChange(){
        this.setState({completed: !this.state.completed, dateCompleted: new Date().toISOString()});
        if(this.state.completed === true){
            this.setState({dateCompleted: ''});
        }

    }

    checkDate(){
        let dateEnded = new Date(this.state.dateEnded).getTime();
        return dateEnded < Date.now();

    }

    render() {
        return( <div className={"work " + (this.state.completed ? "completed " : " ") +(this.checkDate() ? 'overdue': '')}>
           <h3>Name:
               <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
           </h3>
            <p>Description:
                <input type="text" value={this.state.description} onChange={e =>this.setState({description: e.target.value})}/>
            </p>
            <p>Rating:
                <select value={this.state.rating} onChange={e => this.setState({rating: Number(e.target.value)})}>
                    <option value={0}>Normal</option>
                    <option value={1}>Important</option>
                    <option value={2}>Very Important</option>
                </select>
            </p>
            <p>Date ended: {this.state.dateEnded}</p>
            <p>Date completion: {this.state.dateCompleted}</p>
            <p>
                <button onClick={this.completedChange.bind(this)}>Mark as Executed</button>
            </p>
            <p>
                <button onClick={()=>{
                    this.props.onUpdateTask(this.state);
                }}>Save</button>

                <button onClick={()=>{
                    this.props.onDeleteTask(this.state.id);
                }}>Delete</button>
            </p>
          </div>);
    }
}

export default Task;