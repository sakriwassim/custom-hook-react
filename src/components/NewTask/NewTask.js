// import Section from '../UI/Section';
// import TaskForm from './TaskForm';
// import useHttp from '../../hooks/use-http';

// const NewTask = (props) => {

//   const { isLoading, error, sendRequest: sendTaskRequest } = useHttp()

//   // const createTask = (data) => {
//   //   const generatedId = data.name; 
//   //   const createdTask = { id: generatedId, text: taskText };
//   //   props.onAddTask(createdTask);
//   // }

//   const requestConfig = {
//     url: 'https://sssss-5ee85-default-rtdb.firebaseio.com/tasks.json',
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', },
//     body: JSON.stringify({ text: taskText })
//   }

//   const enterTaskHandler = async (taskText) => {
//     const createTask = (data) => {
//       const generatedId = data.name; 
//       const createdTask = { id: generatedId, text: taskText };
//       props.onAddTask(createdTask);
//     }
//     sendTaskRequest({requestConfig},createTask(taskText));
//   };

//   return (
//     <Section>
//       <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
//       {error && <p>{error}</p>}
//     </Section>
//   );
// };

// export default NewTask;



import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

