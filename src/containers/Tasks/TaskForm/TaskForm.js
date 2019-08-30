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
            this.props.createTask(this.state.value);
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        ref={this.myInputElement}
                        className='TaskForm'
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