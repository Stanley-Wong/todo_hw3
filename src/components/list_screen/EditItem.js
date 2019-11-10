import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class EditItem extends Component {
    
    render(){

        const todoListId = this.props.todoListId;
        const todoItemId = this.props.itemId;
        const todoList = this.props.todoList;
        const todoItem = null;
        for(let i=0; i<todoList.length; i++){
            if(todoList[i].id===todoItemId){
                todoItem=todoList[i];
                i=todoList.length;
            }
        }
        console.log(todoItem)
        return(
            <div className="row container white">
                <form className="col s12">
                    <div className="input-field col s12">
                        <input placeholder="Description" id="description" type="text" 
                        /* defaultValue={this.props.todoLists.}  */></input>
                        <label for="description" className="active black-text">description</label>
                    </div>
                    <div className="input-field col s12">
                        <input placeholder="Due Date" id="due_date" type="text"></input>
                        <label for="due_date" className="active black-text">due date</label>
                    </div>
                    <div className="input-field col s12">
                        <input placeholder="Assigned To" id="assigned_to" type="text"></input>
                        <label for="assigned_to" className="active black-text">assigned to</label>
                    </div>
                    <div className="col s12" style={{height: '50px'}}>
                        <label>
                            <input type="checkbox" />
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
    
    const { todoLists } = state.firestore.data;
    
    const todoListId = ownProps.match.params.pathParam1;
    const itemId = ownProps.match.params.pathParam2;

    const todoList = todoLists[itemId];
    
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
        todoListId,
        itemId
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(EditItem);