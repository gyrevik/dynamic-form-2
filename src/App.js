import React from 'react';
import validation from './validation';
import DynamicForm from './Components/DynamicForm';

function App() {
  const fields = [
    {label: 'First Name', type: 'input', name: 'firstName', value: ''},
    {label: 'Last Name', type: 'input', name: 'lastName', value: ''},
    {label: 'City', type: 'input', name: 'city', value: ''},
    {label: 'Address', type: 'input', name: 'address', value: ''},
    {label: 'Occupation', type: 'select', data: ['Teacher', 'Software Engineer', 'Doctor', 'Lawyer'], name: 'occupation', value: 'Please Select'},
    {label: 'Message', type: 'textarea', name: 'message', value: ''},
    {label: 'Agree to Terms & Conditions', type: 'checkbox', name: 'terms', value: false},
    {label: 'Appointment Date 2', type: 'date-time-picker', name: 'date-time-picker-1', value: ''},
  ];

  return (
    <DynamicForm fields={fields} validation={validation} />
  );
}

export default App;
