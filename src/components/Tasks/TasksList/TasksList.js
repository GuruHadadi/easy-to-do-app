import React from 'react';
import classes from './TasksList.css';
import TaskItem from "../TaskItem/TaskItem";

const tasksList = (props) => {
    return (
        <div className={'TaskItem'}>
            <h4 style={{textAlign: 'center'}}>Your tasks ...</h4>
            <table>
                <TaskItem/>
            </table>
        </div>
    )
};

export default tasksList;