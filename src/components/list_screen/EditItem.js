import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class EditItem extends Component {
    state = {
        assignedTo:this.props.todoItem.assigned_to,
        description:this.props.todoItem.description,
        dueDate:this.props.todoItem.due_date,
        completed:this.props.todoItem.completed
    }

    changeDescription = (evt) =>{
        var newDescription = evt.target.value;
        this.setState({description:newDescription});
        console.log(this.state.description);
    }

    changeAssignedTo = (evt) =>{
        var newAssignedTo = evt.target.value;
        this.setState({assignedTo:newAssignedTo});
        console.log(this.state.assignedTo);
    }

    changeDueDate = (evt) =>{
        var newDueDate = evt.target.value;
        this.setState({dueDate:newDueDate});
        console.log(this.state.dueDate);
    }

    changeCompleted = (evt) =>{
        var newCompleted = evt.target.checked;
        this.setState({completed:newCompleted});
    }

    render(){
        const todoItemId = this.props.itemId;
        const todoList = this.props.todoList;
        const todoItem = this.props.todoItem;
        console.log((todoItem.completed===true));
        return(
            <div className="row container white">
                <form className="col s12">
                    <div className="input-field col s12">
                        <input placeholder="Description" id="description" type="text" 
                        defaultValue={this.state.description}
                        onChange={this.changeDescription}
                        ></input>
                        <label for="description" className="active black-text">description</label>
                    </div>
                    <div className="input-field col s12">
                        <input placeholder="Due Date" id="due_date" type="date"
                        defaultValue={this.state.dueDate}
                        onChange={this.changeDueDate}
                        ></input>
                        <label for="due_date" className="active black-text">due date</label>
                    </div>
                    <div className="input-field col s12">
                        <input placeholder="Assigned To" id="assigned_to" type="text"
                        defaultValue={this.state.assignedTo}
                        onChange={this.changeAssignedTo}
                        ></input>
                        <label for="assigned_to" className="active black-text">assigned to</label>
                    </div>
                    <div className="col s12" style={{height: '50px'}}>
                        <label>
                            {(this.state.completed===true)?
                            <input type="checkbox" defaultChecked="checked" onChange={this.changeCompleted}/>:
                            <input type="checkbox" onChange={this.changeCompleted}/>}
                            <span>Completed</span>
                        </label>
                    </div>
                    <div className="col s12" >
                        <Link to={'/todoList/' + this.props.todoListId} key={this.props.todoListId}>
                            <button className="btn green col s2">Submit</button>
                        </Link>
                        <div className="col s1"></div>
                        <Link to={'/todoList/' + this.props.todoListId} key={this.props.todoListId}>
                            <button className="btn red col s2">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoListId = ownProps.match.params.pathParam1;
    const itemId = ownProps.match.params.pathParam2;
    const todoLists = state.firestore.ordered.todoLists;
    let index=0;
    for(let i=0; i<todoLists.length; i++){
        if(todoLists[i].id===todoListId){
            index=i;
            i=todoLists.length;
        }
    }
    const todoList = todoLists[index];
    const todoItem = todoList.items[parseInt(itemId)];
    return {
        auth: state.firebase.auth,
        todoList,
        todoListId,
        itemId,
        todoItem
    };
};

export default compose(connect(mapStateToProps),firestoreConnect([{ collection: 'todoLists' },]),)(EditItem);