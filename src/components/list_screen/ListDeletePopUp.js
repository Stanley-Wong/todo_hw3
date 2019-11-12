import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const inline = {
    display: 'inline-block'
}
const bold = {
    fontWeight: 'bold'
}
const button = {
    height: '50px',
    width: '70px'
}
export class ListDeletePopUp extends Component {
    render() {
        return (
            <div className="deletePopUp row card">
                <p className="col s12">Delete List?</p>
                <p className="col s12" style={bold}>Are you sure you want to delete this list?</p>
                <div className="col s12">
                    <Link to="/">
                    <button className="btn green col s2" style={button} onClick={this.props.confirmDelete}>Yes</button>
                    </Link>
                    <div className="col s1"></div>
                    <button className="btn red col s2" style={button} onClick={this.props.rejectDelete}>No</button>
                </div>
                <div className="col s12">&nbsp;</div>
                <p className="col s12">This list will not be retreivable.</p>
            </div>
        )
    }
}

export default ListDeletePopUp