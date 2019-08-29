import React, {Component} from 'react';

class TaskItem extends Component {// ({name, onDelete}) => {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            editMode: false
        };
    }

    componentDidUpdated(prevState, prevProps) {
        if (prevProps.name !== this.props.name) {
            this.setState({name: this.props.name})
        }
    }

    handleEdit = () => {
        this.setState({editMode: true})
    };

    handleCancel = () => {
        this.setState({editMode: false, name: this.props.name})
    };


    handleChange = (event) => {
        this.setState({name: event.target.value})
    };

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            if (this.state.name !== this.props.name)
                this.editTask(event);
            else
                this.handleCancel();
        }
        else if (event.keyCode === 27) {
            this.handleCancel();
        }
    };

    editTask = (event) => {
        this.props.onEdit(this.props.taskId, event.target.value);
    };

    deleteTask = (event) => {
        this.props.onDelete(this.props.taskId);
    };

    toggleCompleteFlag = (event) => {
        this.props.onToggleComplete(this.props.taskId);
    };


    render() {
        const {editMode, name} = this.state;
        let style = null;
        console.log('this.props.completedFlag', this.props.completedFlag);
        if (this.props.completedFlag) {
            console.log('this.props.completedFlag', this.props.completedFlag);
            style = {backgroundColor: 'red'}
        }
        let item = null;
        if (!editMode) {
            item = (
                <li style={style}>
                    {name}
                    <button onClick={this.handleEdit}>Edit</button>
                    <button onClick={this.deleteTask}>Del</button>
                    <button onClick={this.toggleCompleteFlag}>Toggle Complete</button>
                </li>

            )
        } else {
            item = <li>
                <button onClick={this.handleCancel}>Cancel</button>
                <input onKeyUp={this.handleKeyUp}
                       onChange={this.handleChange} value={name}/>;
            </li>
        }

        return item;
    }
}

export default TaskItem;