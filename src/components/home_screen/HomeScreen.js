import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    state={
        newLink:"",
        redirect:false
    }

    handleNewList=()=>{
        var firestore = getFirestore();
        var newItemRef = firestore.collection('todoLists').doc();
        newItemRef.set(
            {
                name:"Unknown",
                owner:"Unknown",
                items:[],
                timeStamp:new Date()
            }
        )
    }

    statesShow=()=>{
        console.log(this.state.newLink)
        console.log(this.state.redirect)
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        <div>&nbsp;</div>
                        <div className="home_new_list_container">

                        <button className="home_new_list_button" onClick={this.handleNewList}>
                            Create a New To Do List
                        </button>

                        </div>
                        <button onClick={this.statesShow}>
                                states
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);