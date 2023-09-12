import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {


const [tasks, setTasks] = useState([]);

const transformTask = (tasksObj) => {
  const loadedTasks = [];
  for (const taskKey in tasksObj) {
    loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
  }
  setTasks(loadedTasks);
};


  const requestConfig = {
    url: 'https://sssss-5ee85-default-rtdb.firebaseio.com/tasks.json',
    method: 'GET',
    headers: '',
    body: ''
  }

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    fetchTasks(requestConfig, transformTask);
  },[]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
