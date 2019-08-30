import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    createTask,
    editTask,
    deleteTask,
    toggleComplete,
    activeItemsList,
    undoTaskDelete
} from "../../../store/actions";
import TaskItem from "../../../components/Tasks/TaskItem/TaskItem";
import TaskList from "../../../components/Tasks/TasksList/TasksList";
import TaskStatusPanel from "../../../components/Tasks/TaskStatusPanel/TaskStatusPanel";
import Modal from "../../../components/Model/Modal";
import './TaskTable.scss';

class TaskTable extends Component {

    state = {
        show: false,
        searchKey: ''
    };

    handleEdit = (taskId, name) => {
        this.props.editTask(taskId, name);
    };

    handleDelete = (taskId) => {
        this.props.deleteTask(taskId);
        this.setState({show: true});
        setTimeout(() => {
            this.setState({show: false})
        }, 3000);
    };

    handleUndoDeleteTask = () => {
        this.props.undoTaskDelete();
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
        let filteredTasks = this.props.tasks;
        if (filteredTasks && this.state.searchKey !== '') {
            filteredTasks = filteredTasks.filter(task => {
                return task.title.includes(this.state.searchKey)
            });
        }
        return (
            <div className='TaskTable'>
                <Modal show={this.state.show}>
                    <p>Task Successfully Deleted !</p>
                    <button onClick={this.handleUndoDeleteTask}>UNDO</button>
                    {/*<button >UNDO</button>*/}
                </Modal>
                <TaskStatusPanel>
                    <button onClick={() => this.handleDisplayItems('viewall')}>View All</button>
                    <button onClick={() => this.handleDisplayItems('active')}>Active</button>
                    <button onClick={() => this.handleDisplayItems('complete')}>Completed</button>
                </TaskStatusPanel>
                <div>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.root.tasks
    }
};

const mapDispatchToProps = {
    createTask,
    editTask, deleteTask, toggleComplete,
    activeItemsList,
    undoTaskDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);