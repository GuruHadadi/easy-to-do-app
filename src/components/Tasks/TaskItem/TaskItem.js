import React from 'react';
import classes from './TaskItem.css';

const taskItem = (props) => {
    return (
        <li>
            {props.name}
        </li>
    )
};

export default taskItem;