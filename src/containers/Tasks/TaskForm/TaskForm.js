import React, {Component} from 'react';
import classes from './TaskForm.css';

class TaskForm extends Component {
    state = {
    
    };

    render() {
        return (
            <div>
                <form>
                    <input className='Input' placeholder='Enter your task here...' type='text'/>
                </form>
            </div>
        )
    }
}

export default TaskForm;