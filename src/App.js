import React from 'react';
import Header from "./containers/Header/Header";
import TaskForm from "./containers/Tasks/TaskForm/TaskForm";
import TaskTable from "./containers/Tasks/TaskTable/TaskTable";
import firebase from "firebase";
import { firebaseConfig } from './config/config';
import './App.scss';

const App = ( props ) => {
    let defaultProject = firebase.initializeApp(firebaseConfig);
    console.log(defaultProject.name);
    return (
        <div className='App'>
            <Header {...props}/>
            <TaskForm/>
            <TaskTable/>
        </div>
    );
};

export default App;
