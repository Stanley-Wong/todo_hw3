import React from 'react';
import { getFirestore } from 'redux-firestore';

const buttonSize = {
    height: '21px',
    width: '21px',
    position: "relative",
    right:'-85px',
    backgroundColor: "rgb(76, 175, 80)",
    borderRadius: "12px",
    display: 'inline-block'
}

const block = {
    width: '110px',
    right: '150px;'
}

const buttonSize1 = {
    
    height: '21px',
    width: '21px',
    display: 'inline-block',
    position: "relative",
}
const buttonSize2 = {
    height: '21px',
    width: '21px',
    display: 'inline-block',
    position: "relative",
}
const buttonSize3 = {
    height: '21px',
    width: '21px',
    display: 'inline-block',
    position: "relative",
}

class ItemCard extends React.Component {
    state = {
        slideButton : false
    }
    showButtons = () => {
        console.log("this runs")
        this.setState({slideButton:true});
    }
    removeButtons = () => {
        var btn1=document.getElementById("slideButton1");
        var btn2=document.getElementById("slideButton2");
        var btn3=document.getElementById("slideButton3");
        if(btn1!=null && btn2!=null && btn3!=null){
            btn1.style.right='-20px';
            btn1.style.opacity='0';
            btn2.style.right='-15px';
            btn2.style.opacity='0';
            btn3.style.right='-10px';
            btn3.style.opacity='0';
        }
        setTimeout(this.resetSlide,500);
    }
    resetSlide = () =>{
        this.setState({slideButton:false})
    }


    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="row card-content grey-text text-darken-3">
                    <span className="col s8 ">{item.description}</span>
                    <div className="col s4">
                        <div style={block} onMouseLeave={this.removeButtons}>
                            <div className="greenButton" style={buttonSize} onMouseEnter={this.showButtons} >0</div>

                            {this.state.slideButton === true? 
                            <div id="slideButton1" style={buttonSize1} onClick={
                                (e)=>{
                                    e.stopPropagation()
                                    let tempList = this.props.todoList;
                                    let tempItem = tempList.items;
                                    let index = tempItem.indexOf(this.props.item);
                                    if(index!=0){
                                        let temp = tempItem[index-1];
                                        tempItem[index-1]=tempItem[index];
                                        tempItem[index]=temp;
                                    }
                                    var firestore = getFirestore();
                                    firestore.collection('todoLists').doc(this.props.todoList.id).update({items:tempItem});
                                }}>⇧</div>
                            :null
                            }

                            {this.state.slideButton === true? 
                            <div id="slideButton2" style={buttonSize2} onClick={
                                (e)=>{
                                    e.stopPropagation()
                                    let tempList = this.props.todoList;
                                    let tempItem = tempList.items;
                                    let index = tempItem.indexOf(this.props.item);
                                    if(index!=tempItem.length-1){
                                        let temp = tempItem[index+1];
                                        tempItem[index+1]=tempItem[index];
                                        tempItem[index]=temp;
                                    }
                                    var firestore = getFirestore();
                                    firestore.collection('todoLists').doc(this.props.todoList.id).update({items:tempItem});
                                }
                            }>⇩</div>
                            :null
                            }

                            {this.state.slideButton === true? 
                            <div id="slideButton3" style={buttonSize3} onClick={
                                (e)=>{
                                    e.stopPropagation()
                                    let tempList = this.props.todoList;
                                    let tempItem = tempList.items;
                                    let index = tempItem.indexOf(this.props.item);
                                    tempItem.splice(index,1);
                                    var firestore = getFirestore();
                                    firestore.collection('todoLists').doc(this.props.todoList.id).update({items:tempItem});
                                }
                            }>✕</div>
                            :null
                            }

                        </div>
                    </div>

                    <span className="col s4 ">Assigned to: {item.assigned_to}</span>
                    <span className="col s4 ">{item.due_date}</span>
                    {item.completed===true ? <span className="col s4 green-text">True</span> : <span className="col s4 red-text">False</span>}
                </div>
            </div>
        );
    }
}
export default ItemCard;