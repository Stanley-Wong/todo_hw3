import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import { NavLink, Redirect } from 'react-router-dom';

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

    changeItem=()=>{
        let tempList = this.props.todoList.items;
        let tempItem = tempList[parseInt(this.props.itemActualId)];
        tempItem.assigned_to=this.state.assignedTo;
        tempItem.completed=this.state.completed;
        tempItem.description=this.state.description;
        tempItem.due_date=this.state.dueDate;
        console.log(tempItem.hasOwnProperty('newly'))
        if(tempItem.hasOwnProperty('newly')){
            delete tempItem['newly'];
        }
        var firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoListId).update({items:tempList});
    }

    checkNew=()=>{
        let tempList = this.props.todoList.items;
        let tempItem = tempList[parseInt(this.props.itemActualId)];
        if(tempItem.hasOwnProperty('newly')){
            tempList.pop();
        }
        var firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoListId).update({items:tempList});
    }

    render(){
        console.log(this.props.todoList.items)
        console.log(this.props.todoList.items[parseInt(this.props.itemActualId)])
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
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
                            <button className="btn green col s2" onClick={this.changeItem}>Submit</button>
                        </Link>
                        <div className="col s1"></div>
                        <Link to={'/todoList/' + this.props.todoListId} key={this.props.todoListId} onClick={this.checkNew}>
                            <button className="btn red col s2">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let todoListId = ownProps.match.params.pathParam1;
    let itemId = ownProps.match.params.pathParam2;
    let {todoLists} = state.firestore.data;
    let todoList = todoLists ? todoLists[todoListId] : null;
    let index1=-1;
    for(let i=0; i<todoList.items.length; i++){
        console.log(todoList.items[i].key)
        if(todoList.items[i].key===parseInt(itemId)){
            console.log("found"+todoList.items[i].key+" "+parseInt(itemId));
            index1=i;
            i=todoList.items.length;
        }
    }
    let itemActualId=index1;
    let todoItem = todoList.items[index1];
    return {
        auth: state.firebase.auth,
        todoList,
        todoListId,
        itemId,
        todoItem,
        itemActualId
    };
};

export default compose(connect(mapStateToProps),firestoreConnect([{ collection: 'todoLists' },]),)(EditItem);