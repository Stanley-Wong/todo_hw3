import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {

    render() {
        const todoLists = this.props.todoLists;
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.sort(function(a,b){return a.timeStamp<b.timeStamp}).map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} onClick={()=>{
                            var firestore=getFirestore();
                            firestore.collection('todoLists').doc(todoList.id).update({"timeStamp": new Date()});
                        }
                        }>
                        <TodoListCard todoList={todoList}/>
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);