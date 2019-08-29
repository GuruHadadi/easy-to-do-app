import React from 'react';
import Header from "./components/Header/Header";
import TaskForm from "./containers/Tasks/TaskForm/TaskForm";
import TaskTable from "./containers/Tasks/TaskTable/TaskTable";

const App = () => {
    return (
        <div>
            <Header/>
            <TaskForm/>
            <TaskTable/>
        </div>
    );
};

export default App;
