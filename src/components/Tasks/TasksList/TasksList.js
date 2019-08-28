import React from 'react';
import classes from './TasksList.css';
import TaskItem from "../TaskItem/TaskItem";

const tasksList = (props) => {
    return (
        <ul>
            {props.children}
        </ul>
    )
};

export default tasksList;