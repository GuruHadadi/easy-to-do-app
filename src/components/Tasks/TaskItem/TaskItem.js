import React, {Component} from 'react';
import './TaskItem.scss';
import editImage from '../../../assets/images/edit.png';

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
        console.log('this.props.taskId', this.props.taskId);
        this.props.onToggleComplete(this.props.taskId, this.props.toggleFlag);
    };

    render() {
        const {editMode, name} = this.state;
        let style = null;
        if (this.props.completedFlag) {
            style = {backgroundColor: 'red'}
        } else
            style = {backgroundColor: 'inherit'}
        let item = null;
        if (!editMode) {
            item = (
                <li className='TaskItem' style={style}>
                        <button className='TaskItem-button' onClick={this.toggleCompleteFlag}>Complete</button>
                    <div className="TaskItem-text">
                    {name}
                    </div>
                    <div className='TaskItem-buttons'>
                        <button className='TaskItem-button' onClick={this.handleEdit}><img src={editImage}/></button>
                        <button className='TaskItem-button' onClick={this.deleteTask}>Del</button>
                    </div>
                </li>

            )
        } else {
            item = <li>
                <button className='TaskItem-button' onClick={this.handleCancel}>Cancel</button>
                <input
                    autoFocus={true}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange} value={name}/>;
            </li>
        }

        return item;
    }
}

export default TaskItem;