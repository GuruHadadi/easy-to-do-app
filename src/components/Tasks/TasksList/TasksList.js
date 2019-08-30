import React from 'react';
import './TasksList.scss';

const tasksList = (props) => {
    return (
        <ul>
            {props.children}
        </ul>
    )
};

export default tasksList;