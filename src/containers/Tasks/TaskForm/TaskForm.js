import React, {Component} from 'react';
import './TaskForm.scss';
import {connect} from "react-redux";
import {createTask} from "../../../store/actions";

class TaskForm extends Component {

    state = {
        value: '',
    };

    myInputElement = React.createRef();

    componentDidMount(){
        this.myInputElement.current.focus()
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.value) {
            this.props.createTask(this.state.value, this.props.userId);
            this.setState({value: ''})
        }
    };

    handleOnchange = (event) => {
        this.setState({
            value: event.target.value
        })
    };

    render() {
        return (
            <div style={{padding: '20px'}}>
                <form onSubmit={this.handleSubmit}>
                    <input
                        // disabled={!this.props.authenticated}
                        ref={this.myInputElement}
                        className='TaskForm'
                        // placeholder={this.props.authenticated ? 'Enter your task here...' : 'Please login to add tasks..'}
                        placeholder={true ? 'Enter your task here...' : 'Please login to add tasks..'}
                        type='text'
                        onChange={this.handleOnchange}
                        value={this.state.value}
                    />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.root.tasks,
        userId: state.root.userId,
        authenticated: state.root.authenticated
    }
};

const mapDispatchToProps = {createTask};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);