import React from 'react';
import { getFirestore } from 'redux-firestore';

const buttonSize = {
    height: '35px',
    width: '35px',
    position: "relative",
    right:'-140px',
    backgroundColor: "rgb(76, 175, 80)",
    borderRadius: "12px",
    display: 'inline-block',
    textAlign:'center',
    fontSize:'27px'
}

const block = {
    width: '175px',
    right: '150px;',

}

const buttonSize1 = {
    
    height: '35px',
    width: '35px',
    display: 'inline-block',
    position: "relative",
    textAlign:'center',
    fontSize:'27px'
}
const buttonSize2 = {
    height: '35px',
    width: '35px',
    display: 'inline-block',
    position: "relative",
    textAlign:'center',
    fontSize:'27px'
}
const buttonSize3 = {
    height: '35px',
    width: '35px',
    display: 'inline-block',
    position: "relative",
    textAlign:'center',
    fontSize:'27px'
}

class ItemCard extends React.Component {
    state = {
        slideButton : false
    }
    showButtons = (e) => {
        e.preventDefault();
        this.setState({slideButton:true});
    }

    removeButtons = () => {
        var btn1=document.getElementById("slideButton1");
        var btn2=document.getElementById("slideButton2");
        var btn3=document.getElementById("slideButton3");
        var btn1D=document.getElementById("slideButton1D");
        var btn2D=document.getElementById("slideButton2D");
        if(btn1!=null && btn2!=null && btn3!=null){
            btn1.style.right='-15px';
            btn1.style.opacity='0';
            btn2.style.right='-15px';
            btn2.style.opacity='0';
            btn3.style.right='-10px';
            btn3.style.opacity='0';
        }
        else if(btn1!=null && btn2D!=null && btn3!=null){
            btn1.style.right='-15px';
            btn1.style.opacity='0';
            btn2D.style.right='-15px';
            btn2D.style.opacity='0';
            btn3.style.right='-10px';
            btn3.style.opacity='0';
        }
        else if(btn1D!=null && btn2!=null && btn3!=null){
            btn1D.style.right='-15px';
            btn1D.style.opacity='0';
            btn2.style.right='-15px';
            btn2.style.opacity='0';
            btn3.style.right='-10px';
            btn3.style.opacity='0';
        }
        setTimeout(this.resetSlide,200);
    }

    resetSlide = () =>{
        this.setState({slideButton:false})
    }

    moveUp = (e) =>{
        e.preventDefault();
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
        this.resetSlide();
    }

    moveDown = (e) => {
        e.preventDefault();
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
        this.resetSlide();
    }
    delete = (e) =>{
        e.preventDefault();
        let tempList = this.props.todoList;
        let tempItem = tempList.items;
        let index = tempItem.indexOf(this.props.item);
        tempItem.splice(index,1);
        var firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({items:tempItem});
        this.resetSlide();
    }

    render() {
        const { item } = this.props;  
        console.log(this.props.todoList.items.indexOf(this.props.item));
        console.log(this.props.item)
        return (
            <div className="card todo-list-link pink-lighten-3" style={{borderRadius: '30px'}} onClick={this.change}>
                <div className="row card-content grey-text text-darken-3">
                    <span className="col s8 ">{item.description}</span>
                    <div className="col s4">
                        <div style={block} onMouseLeave={this.removeButtons}>
                            <div className="greenButton" style={buttonSize} onMouseEnter={this.showButtons} >
                                <i class="material-icons">border_color</i>
                            </div>
                            {this.state.slideButton === true? (
                                (this.props.todoList.items.indexOf(this.props.item)!==0)?
                                (<div id="slideButton1" style={buttonSize1} onClick={this.moveUp}>
                                    <i class="material-icons">arrow_upward</i>
                                </div>):
                                (<div id="slideButton1D" style={buttonSize1} onClick={(e)=>{e.preventDefault()}}>
                                <i class="material-icons">arrow_upward</i>
                                </div>)
                            )
                            :null
                            }
                            {this.state.slideButton === true? (
                                (this.props.todoList.items.indexOf(this.props.item)!==this.props.todoList.items.length-1)?
                                (<div id="slideButton2" style={buttonSize2} onClick={this.moveDown}>
                                    <i class="material-icons">arrow_downward</i>
                                </div>):
                                (<div id="slideButton2D" style={buttonSize2} onClick={(e)=>{e.preventDefault()}}>
                                    <i class="material-icons">arrow_downward</i>
                                </div>)
                            ) 
                            :null
                            }
                            {this.state.slideButton === true? 
                            <div id="slideButton3" style={buttonSize3} onClick={this.delete}>
                                <i class="material-icons">close</i>
                            </div>
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