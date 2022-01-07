import React from 'react';
import validation from './validation';
import DynamicForm from './Components/DynamicForm';

function App() {
  return (
    <DynamicForm validation={validation} />
  );
}

export default App;
