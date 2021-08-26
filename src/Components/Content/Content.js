import React, {Component} from 'react';
import './index.css'

class Content extends Component {
    state = {
        inputValue: ''
    }

    changeMessageInput = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    sendMessage = () => {
        let from = 3
        let to = this.props.selectedUser.id
        let text = this.state.inputValue
        this.props.sendMessage(from, to, text)
        this.setState({
            inputValue: ''
        })
    }

    render() {
        const {selectedUser} = this.props
        return (
            <div>
                {
                    selectedUser ?
                        <div className={"content"}>
                            <div className="row">
                                <div className="col-md-12 p-3 content-header">
                                    <div className="d-flex">
                                        <div className={"circle"}></div>
                                        <h4>{selectedUser.firstName + " " + selectedUser.lastName}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 position-relative">
                                    <div className="d-flex">
                                        <input type="text" className={"form-control position-absolute"}
                                               style={{
                                                   width: "566px",
                                                   bottom: "-660px",
                                                   left: 0,
                                                   zIndex: 2,
                                                   boxShadow: "0 -5px 20px -5px silver"
                                               }}
                                               value={this.state.inputValue} onChange={this.changeMessageInput}/>
                                        <button className={"btn btn-primary position-absolute"}
                                                style={{bottom: "-660px", right: "585px", zIndex: 2}}
                                                onClick={this.sendMessage}>Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row bg-light w-50 position-relative  " style={{zIndex: "1"}}>
                                <div style={{overflowY: "scroll", height: "623px"}}>
                                    {
                                        this.props.history.map((item, index) => <div
                                            className={"row message border border-white"}>
                                            <div className={`col-md-12  ${item.id === 3 ? 'offset-5' : ''}`}>
                                                <p className={"text"}>{item.text}
                                                    <span className={"date"}>{item.date}</span>
                                                </p>
                                            </div>
                                        </div>)
                                    }
                                </div>

                            </div>
                            <div className={"message-background"}></div>
                            <div className="circle-in-photo"></div>
                            <h1 className={"telegram"}>TELEGRAM CLONE</h1>
                            <h5 className={"blog"}>OYATULLOH_CODER .BLOG</h5>
                        </div> :
                        <div>

                        </div>
                }
            </div>
        );
    }
}

export default Content;