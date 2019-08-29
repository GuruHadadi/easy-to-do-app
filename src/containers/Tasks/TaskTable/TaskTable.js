import React, {Component} from 'react';
import {connect} from "react-redux";
import {createTask, editTask, deleteTask, toggleComplete, activeItemsList} from "../../../store/actions";
import TaskItem from "../../../components/Tasks/TaskItem/TaskItem";
import TaskList from "../../../components/Tasks/TasksList/TasksList";
import TaskStatusPanel from "../../../components/Tasks/TaskStatusPanel/TaskStatusPanel";

class TaskTable extends Component {

    state = {
        // tasks: null
    };

    handleEdit = (taskId, name) => {
        this.props.editTask(taskId, name);
    };

    handleDelete = (taskId) => {
        this.props.deleteTask(taskId);
    };

    handleToggleCompleteFlag = (taskId, toggleFlag) => {
        this.props.toggleComplete(taskId, toggleFlag);
    };

    handleDisplayItems = (type) => {
        this.props.activeItemsList(type)
    };


    renderTaskList() {

    }

    render() {
        //logic..
        //const tasks = this.props.tasksk
        return (
            <div>
                <TaskStatusPanel>
                    <button onClick={() => this.handleDisplayItems('viewall')}>View All</button>
                    <button onClick={() => this.handleDisplayItems('active')}>Active</button>
                    <button onClick={() => this.handleDisplayItems('complete')}>Completed</button>
                </TaskStatusPanel>
                <TaskList>{
                    this.props.tasks && this.props.tasks.map((item, index) => {
                        return (
                            <TaskItem
                                taskId={index}
                                onEdit={this.handleEdit}
                                onDelete={this.handleDelete}
                                onToggleComplete={this.handleToggleCompleteFlag}
                                toggleFlag={item.completeFlag}
                                name={item.title}
                                completedFlag={item.completeFlag}
                                key={item + index}
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

const mapDispatchToProps = {createTask, editTask, deleteTask, toggleComplete, activeItemsList};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);