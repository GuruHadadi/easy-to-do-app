import React from 'react';

const tasksList = (props) => {
    return (
        <ul>
            {props.children}
        </ul>
    )
};

export default tasksList;