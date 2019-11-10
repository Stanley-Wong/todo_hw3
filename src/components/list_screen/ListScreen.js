import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore';

const headerSize = {
    height: '30px'
}

const icon = {
    textAlign: 'center'
}
class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    sortTask =()=>{
        let tempList = this.props.todoList;
        let tempItems = tempList.items;
        tempItems.sort(function(a,b){return a.description.localeCompare(b.description)});
        console.log(tempItems);
        var firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({items:tempItems});
    } 

    sortDate =()=>{
        let tempList = this.props.todoList;
        let tempItems = tempList.items;
        tempItems.sort(function(a,b){return a.due_date.localeCompare(b.due_date)});
        console.log(tempItems);
        var firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({items:tempItems});
    } 

    sortCompleted =()=>{
        let tempList = this.props.todoList;
        let tempItems = tempList.items;
        tempItems.sort(function(a,b){
            if(a.completed===true&&b.completed===false)
              return -1;   
            else if(a.completed===false&&b.completed===true)
              return 1;
            else
              return 0;
            }
          );
        console.log(tempItems);
        var firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({items:tempItems});
    } 


    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <input type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                    <label for="name" className="active">Name</label>
                </div>
                <div className="input-field">
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                    <label for="owner" className="active">Owner</label>
                </div>
                <div className="card z-depth-0" style={headerSize}>
                    <div className="row card-content">
                        <span className="col s4 card-title" onClick={this.sortTask}>Task</span>
                        <span className="col s4 card-title" onClick={this.sortDate}>Due Date</span>
                        <span className="col s4 card-title" onClick={this.sortCompleted}>Status</span>
                    </div>
                </div>
                    <ItemsList todoList={todoList} />
                <div className="card z-depth-0 row">
                    <i className="medium material-icons col s12" style={icon} onClick={this.additem}>add_circle_outline</i>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);