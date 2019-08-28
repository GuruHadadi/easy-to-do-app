import React from 'react';
import Header from "./components/Header/Header";
import TaskForm from "./containers/Tasks/TaskForm/TaskForm";
import TaskTable from "./containers/Tasks/TaskTable/TaskTable";
import TasksList from "./components/Tasks/TasksList/TasksList";

const App = () => {
  return (
    <div>
      <Header/>
      <TaskForm/>
        <TaskTable />
    </div>
  );
};

export default App;
