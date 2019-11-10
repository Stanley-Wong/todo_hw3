import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class EditItem extends Component {
    
    render(){

        const todoItemId = this.props.itemId;
        const todoList = this.props.todoList;
        const todoItem = todoList.items[parseInt(todoItemId)];
        console.log((todoItem.completed===true));
        return(
            <div className="row container white">
                <form className="col s12">
                    <div className="input-field col s12">
                        <input placeholder="Description" id="description" type="text" 
                        defaultValue={todoItem.description} ></input>
                        <label for="description" className="active black-text">description</label>
                    </div>
                    <div className="input-field col s12">
                        <input placeholder="Due Date" id="due_date" type="text"
                        defaultValue={todoItem.due_date}></input>
                        <label for="due_date" className="active black-text">due date</label>
                    </div>
                    <div className="input-field col s12">
                        <input placeholder="Assigned To" id="assigned_to" type="text"
                        defaultValue={todoItem.assigned_to}></input>
                        <label for="assigned_to" className="active black-text">assigned to</label>
                    </div>
                    <div className="col s12" style={{height: '50px'}}>
                        <label>
                            {(todoItem.completed===true)?<input type="checkbox" defaultChecked="checked"/>:<input type="checkbox"/>}
                            <span>Completed</span>
                        </label>
                    </div>
                    <div className="col s12" >
                        <button className="btn green">Submit</button>
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
    const todoList = todoLists[itemId];
    return {
        auth: state.firebase.auth,
        todoList,
        todoListId,
        itemId
    };
};

export default compose(connect(mapStateToProps),firestoreConnect([{ collection: 'todoLists' },]),)(EditItem);