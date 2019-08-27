import React from 'react';
import Header from "./components/Header/Header";
import TaskForm from "./containers/Tasks/TaskForm/TaskForm";
import TasksList from "./components/Tasks/TasksList/TasksList";

const App = () => {
  return (
    <div>
      <Header/>
      <TaskForm/>
        <TasksList/>
    </div>
  );
};

export default App;
