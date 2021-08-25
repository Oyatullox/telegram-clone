import React, {Component} from 'react';
import Sidebar from "./Components/Sidebar/Sidebar";
import Content from "./Components/Content/Content";
import './index.css'

class App extends Component {
    state = {
        users: [],
        selectedUser: '',
        messages: [],
        history: []
    }
    selectUser = (user) => {
        this.setState({
            selectedUser: user
        })
        localStorage.setItem('selectedUser', JSON.stringify(user))

        this.getMessageHistory(user)

    }

    getMessageHistory = (user) => {
        let b = localStorage.getItem('messages')
        if (b) {
            let messages = JSON.parse(b);
            let history = messages.filter((item)=> (item.from === 3 && item.to === user.id) || (item.from === user.id && item.to === 3));
            this.setState({
                history
            })
        }

    }

    addUser = (firstName, lastName, phone) => {
        let a = this.state.users;
        a.push({id: a.length, firstName: firstName, lastName: lastName, phone: phone})
        this.setState({
            users: a
        })
        localStorage.setItem('users', JSON.stringify(a))
    }

    sendMessage = (fromId, toId, text) => {
        let date = new Date();
        let message = {
            from: fromId,
            to: toId,
            text: text,
            date: date.getHours() + ":" + date.getMinutes()
        }
        let messages = this.state.messages;
        messages.push(message)
        this.setState({
            messages: messages
        })
        localStorage.setItem('messages', JSON.stringify(messages))

        this.getMessageHistory(this.state.users.filter(value => value.id === toId)[0])

    }


    componentDidMount() {
        let usersString = localStorage.getItem('users');
        if (usersString) {
            let userArray = JSON.parse(usersString);
            this.setState({
                users: userArray
            })
        }
        let item = localStorage.getItem('selectedUser');
        if (item) {
            let parse = JSON.parse(item);
            this.setState({
                selectedUser: parse
            })
            this.getMessageHistory(parse)
        }
        let messages = localStorage.getItem('messages');
        if (messages) {
            let parse = JSON.parse(messages);
            this.setState({
                messages: parse
            })
        }
    }


    render() {
        return (
            <div>
                <div className={"container-fluid"}>
                    <div className="row">
                        <div className="col-md-3 sidebar-parent ">
                            <Sidebar users={this.state.users} addUser={this.addUser}
                                     selectedUser={this.state.selectedUser} selectUser={this.selectUser}/>
                        </div>

                        <div className="col-md-9 content-parent">
                            <Content history={this.state.history} sendMessage={this.sendMessage}
                                     selectedUser={this.state.selectedUser}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;