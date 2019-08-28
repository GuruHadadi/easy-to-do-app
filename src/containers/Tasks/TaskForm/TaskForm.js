import React, {Component} from 'react';
import classes from './TaskForm.css';
import {connect} from "react-redux";
import {createTask} from "../../../store/actions";

class TaskForm extends Component {
    state = {
        value: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createTask(this.state.value)
        this.setState({value: ''})
    };
    handleOnchange = (event) => {
        console.log('event', event.target.value);
        this.setState({
            value: event.target.value
        })
    };

    render() {
        console.log('this.props', this.props.tasks);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className='Input'
                        placeholder='Enter your task here...'
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
        tasks: state.root.tasks
    }
};

const mapDispatchToProps = {createTask};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);