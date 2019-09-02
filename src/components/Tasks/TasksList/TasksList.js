import React from 'react';
import './TasksList.scss';

const tasksList = (props) => {
    return (
        <ul style={{padding: '10px'}}>
            {props.children}
        </ul>
    )
};

export default tasksList;