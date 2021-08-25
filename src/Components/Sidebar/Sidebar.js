import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import './index.css'

class Sidebar extends Component {
    state = {
        modalVisible: false
    }

    modalToogle = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let firstName = event.target[0].value;
        let lastName = event.target[1].value;
        let phone = event.target[2].value;
        this.props.addUser(firstName, lastName, phone)
        this.modalToogle()
    }

    userClicked = (user) => {
        this.props.selectUser(user)
    }

    render() {
        const {modalVisible} = this.state
        const {users,selectedUser} = this.props
        return (
            <div className={"sidebar"}>
                <button className={"btn btn-dark w-100 mt-1 "} onClick={this.modalToogle}>Add User</button>
                <hr/>
                <ul className={"list-group parent"}>
                    {
                        users.map((item) => (
                            <li onClick={()=>this.userClicked(item)}
                                className={`list-group-item user ${selectedUser.id===item.id? 'active':''}`}>{item.firstName + ' ' + item.lastName}</li>))
                    }
                </ul>

                <Modal isOpen={modalVisible} toggle={this.modalToogle}>
                    <ModalHeader>
                        <h1>Add User</h1>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.submitForm} id={'addUser'}>
                            FirstName <input className={"form-control"} type="text"/>
                            LastName <input className={"form-control"} type="text"/>
                            Phone <input className={"form-control"} type="text"/>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className={"btn btn-success"} form={'addUser'}>Save</button>
                        <button className={"btn btn-danger"} onClick={this.modalToogle}>Close</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Sidebar;