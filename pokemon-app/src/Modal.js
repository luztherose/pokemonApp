import React, { Component } from "react";

class Modal extends Component {

    render() {
        return (
            <div>
                <div className={ this.props.className } id="myModal" >
                    <div className="modal-content">
                        <span className="close" onClick={ this.props.onClose }>&times;</span>
                        <p>Some text in the Modal..</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;