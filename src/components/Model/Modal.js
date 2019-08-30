import React from 'react';
import './Modal.css';

const modal = (props) => {
    return (
        <div
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100)',
                opacity: props.show ? '1' : '0',
                display: props.show ? 'block' : 'none'
            }}
            className='Modal'>
            {props.children}
        </div>
    )
};

export default modal;