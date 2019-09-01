import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    createTask,
    editTask,
    deleteTask,
    toggleComplete,
    activeItemsList,
    undoTaskDelete,
    signInWithGoogle,
    signOutGoogle
} from "../../../store/actions";
import TaskItem from "../../../components/Tasks/TaskItem/TaskItem";
import TaskList from "../../../components/Tasks/TasksList/TasksList";
import TaskStatusPanel from "../../../components/Tasks/TaskStatusPanel/TaskStatusPanel";
import Modal from "../../../components/Model/Modal";
import './TaskTable.scss';
import Header from "../../Header/Header";

class TaskTable extends Component {

    state = {
        show: false,
        searchKey: ''
    };

    handleEdit = (task, name) => {
        this.props.editTask(task, name, this.props.userId);
    };


    handleDelete = (task) => {
        this.props.deleteTask(task, this.props.userId);
        this.setState({show: true});
        setTimeout(() => {
            this.setState({show: false})
        }, 5000);
    };

    handleUndoDeleteTask = () => {
        let task = this.props.lastDeletedItem;
        this.props.createTask(task.title, this.props.userId, task.completeFlag);
        // this.props.undoTaskDelete();
        // this.props.undoTaskDelete();
        this.setState({show: false});
    };

    handleToggleCompleteFlag = (taskId, toggleFlag) => {
        this.props.toggleComplete(taskId, toggleFlag);
    };

    handleDisplayItems = (type) => {
        this.props.activeItemsList(type)
    };

    handleSearch = (event) => {
        this.setState({searchKey: event.target.value})
    };

    render() {
        //logic..
        // let filteredTasks = this.props.tasks;
        let filteredTasks = JSON.parse(localStorage.getItem('tasks'));
        // console.log('localStorage.getItem', JSON.parse(localStorage.getItem('tasks')));
        if (filteredTasks && this.state.searchKey !== '') {
            filteredTasks = filteredTasks.filter(task => {
                return task.title.includes(this.state.searchKey)
            });
        }
        return (
            <div>
                <div className='TaskTable'>
                    <Modal show={this.state.show}>
                        <p>Task Successfully Deleted !</p>
                        <button onClick={this.handleUndoDeleteTask}>UNDO</button>
                        {/*<button >UNDO</button>*/}
                    </Modal>
                    <div className='TaskControlsPanel'>
                        <div>
                            <button onClick={() => this.handleDisplayItems('viewall')}>View All</button>
                            <button onClick={() => this.handleDisplayItems('active')}>Active</button>
                            <button onClick={() => this.handleDisplayItems('complete')}>Completed</button>
                        </div>
                        <input
                            className='TaskTable-input'
                            placeholder='Filter Tasks'
                            type='text'
                            value={this.state.searchKey}
                            onChange={this.handleSearch}
                        />
                    </div>
                    <TaskList>{
                        filteredTasks && filteredTasks.map((item, index) => {
                            return (
                                <TaskItem
                                    task={item}
                                    taskId={index}
                                    onEdit={this.handleEdit}
                                    onDelete={this.handleDelete}
                                    onToggleComplete={this.handleToggleCompleteFlag}
                                    toggleFlag={item.completeFlag}
                                    name={item.title}
                                    completedFlag={item.completeFlag}
                                    key={item.title + index}
                                />
                            )
                        })
                    }
                    </TaskList>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.root.tasks,
        authenticated: state.root.authenticated,
        userId: state.root.userId,
        lastDeletedItem: state.root.lastDeletedItem
    }
};

const mapDispatchToProps = {
    createTask,
    editTask, deleteTask, toggleComplete,
    activeItemsList,
    undoTaskDelete,
    signInWithGoogle,
    signOutGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);