import React, {Component} from 'react';
import {connect} from "react-redux";
import {createTask} from "../../../store/actions";
import TaskItem from "../../../components/Tasks/TaskItem/TaskItem";
import TaskList from "../../../components/Tasks/TasksList/TasksList";

class TaskTable extends Component {

    render() {
        console.log('this.props', this.props.tasks);
        return (
            <div>
                <TaskList>{
                    this.props.tasks && this.props.tasks.map((item, index) => {
                        return (
                            <TaskItem
                                name={item}
                                key={item+index}
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

const mapDispatchToProps = {createTask};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);