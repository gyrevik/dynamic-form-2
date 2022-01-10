import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import CheckBox from './CheckBox';
import TextArea from './TextArea';
import Select from './Select';
import { DatePicker } from 'react-formik-ui';
import styled from "styled-components";
import '../App.css';

function DynamicForm(props)  {
    const fieldSet1 = [
        {label: 'First Name', type: 'input', name: 'firstName', value: ''},
        {label: 'Last Name', type: 'input', name: 'lastName', value: ''},
        {label: 'City', type: 'input', name: 'city', value: ''},
        {label: 'Address', type: 'input', name: 'address', value: ''},
        {label: 'Occupation', type: 'select', data: ['Teacher', 'Software Engineer', 'Doctor', 'Lawyer'], name: 'occupation', value: 'Please Select'},
        {label: 'Message', type: 'textarea', name: 'message', value: ''},
        {label: 'Agree to Terms & Conditions', type: 'checkbox', name: 'terms', value: false},
        {label: 'Appointment Date 2', type: 'date-time-picker', name: 'date-time-picker-1', value: '01/04/2022'},
    ];

    const [fieldsArr, setFieldsArr] = useState(fieldSet1);

    const theme = {
        blue: {
            default: "#3f51b5",
            hover: "#283593"
        },
        pink: {
            default: "#e91e63",
            hover: "#ad1457"
        }
    };

    const Button = styled.button`
        background-color: ${(props) => theme[props.theme].default};
        color: white;
        padding: 5px 15px;
        border-radius: 5px;
        outline: 0;
        text-transform: uppercase;
        margin: 10px 0px;
        cursor: pointer;
        box-shadow: 0px 2px 2px lightgray;
        transition: ease background-color 250ms;
        &:hover {
            background-color: ${(props) => theme[props.theme].hover};
        }
        &:disabled {
            cursor: default;
            opacity: 0.7;
        }
    `;

    Button.defaultProps = {
        theme: "blue"
    };

    function deleteMe(event) {
        event.preventDefault();
        const filtered = fieldsArr.filter((t) => t.name !== event.target.id);
        setFieldsArr(filtered);
    }

    const renderFields = (inputs) => {
        return inputs.map((input, index) => {
            if (input.type === 'select') {
                return (
                    <>
                        <Select key={index} input={input} />
                        <Button id={input.name} onClick={deleteMe}>Delete</Button>
                    </>
                )
            }

            if (input.type === 'checkbox') {
                return (
                    <>
                        <CheckBox key={index} input={input} />
                        <Button id={input.name} onClick={deleteMe}>Delete</Button>
                    </>
                )
            }

            if (input.type === 'textarea') {
                return (
                    <>
                        <TextArea key={index} index={index} input={input} />
                        <Button id={input.name} onClick={deleteMe}>Delete</Button>
                    </>
                )
            }

            if (input.type === 'date-time-picker') {
                return (
                    <>
                        <DatePicker
                            key={index}
                            name={input.name}
                            label='Select a date and time'
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            dateFormat="dd.MM.yyyy hh:mm aa"
                            timeCaption="time"
                            minDate={new Date()}
                        />
                        <Button id={input.name} onClick={deleteMe}>Delete</Button>
                    </>
                )
            }

            return (
                <div key={input.name}>
                    <label>{input.label}</label>
                    <div>
                        <Field
                            name={input.name}
                        >
                            {props => {
                                const { field } = props;
                                const { errors, touched } = props.form;
                                const hasError = errors[input.name] && touched[input.name] ? 'hasError' : '';
                                return (
                                    <>
                                        <input
                                            {...field}
                                            id={hasError}
                                            type='text'
                                        />  
                                        <Button id={input.name} onClick={deleteMe}>Delete</Button>
                                    </>
                                );
                            }}
                        </Field>
                    </div>
                </div>
            );
        })
    }

    const getInitialValues = (inputs) => {
        // declare an empty initialValues object
        const initialValues = {};
        // loop over fields array
        // if prop does not exist in the initialValues object,
        // pluck off the name and value props and add it to the initialValues object;
        inputs.forEach(field => {
            if (!initialValues[field.name]) {
                initialValues[field.name] = field.value;
            }
        });

        return initialValues;
    }

    const initialValues = getInitialValues(fieldsArr);

    return (
        <div className="app">
            <h1>Dynamic Form</h1>
            <section>
                <div>
                    <select>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option selected value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </div>
                <Formik
                    onSubmit={(values) => { console.log(values) }}
                    validationSchema={props.validation}
                    initialValues={initialValues}
                >
                    {form => {
                        const numErrors =  Object.keys(form.errors).length;
                        let legitError = false;
                        if (numErrors > 0)
                            Object.keys(form.errors).forEach(key => {
                                if (form.touched[key] !== undefined)
                                    legitError = true;
                            });
                        const errorMessageShow = numErrors && legitError ? 'error' : 'hidden';
                        return (
                            <div>
                                <form onSubmit={form.handleSubmit}>
                                    <div className={errorMessageShow}>
                                        Please correct the errors below
                                    </div>
                                    {renderFields(fieldsArr)}
                                    <button type='submit' className='btn'>Submit</button>
                                </form>
                            </div>
                        )
                    }}
                </Formik>
            </section>
        </div>
    );
}

export default DynamicForm;