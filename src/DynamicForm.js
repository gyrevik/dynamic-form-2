import React, { Fragment } from 'react';
import { Formik, Field } from 'formik';
import './App.css';

function DynamicForm(props)  {
    const renderCheckBox = (input) => {
        return (
            <Fragment key={input.name}>
                <label>{input.label}</label>
                <Field
                    name={input.name}
                    render={(prop) => {
                        const { field } = prop;
                        return (
                            <input
                                name={input.name}
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange} />
                        );
                    }}
                />
            </Fragment>

        );
    }

    const renderTextArea = (input) => {
        return (
            <Fragment key={input.name}>
                <label>{input.label}</label>
                <div>
                    <Field
                        name={input.name}
                        render={(props) => {
                            const { field } = props;
                            const { errors, touched } = props.form;
                            const hasError = errors[input.name] && touched[input.name] ? 'hasError' : '';
                            return (
                                <div>
                                    <textarea {...field} id={hasError}>
                                    </textarea>
                                </div>
                            );
                        }}
                    />
                </div>
            </Fragment>
        );
    }

    const renderSelect = (input) => {
        return (
            <Fragment key={input.name}>
                <label>{input.label}</label>
                <div>
                    <Field
                        name={input.name}
                        render={(props) => {
                            const { field } = props;
                            const { errors, touched } = props.form;
                            const hasError = errors[input.name] && touched[input.name] ? 'hasError' : '';
                            const defaultOption = <option key='default' value='Please Select'>Please Select</option>;
                            const options = input.data.map(i => <option key={i} value={i}> {i} </option>);
                            const selectOptions = [defaultOption, ...options];
                            return (
                                <div className='dropdown'>
                                    <select value={field.value} {...field} id={hasError}>
                                        {
                                            selectOptions
                                        }
                                    </select>
                                </div>
                            );
                        }}
                    />
                </div>
            </Fragment>
        );
    }

    const renderFields = (inputs) => {
        return inputs.map(input => {
            if (input.type === 'select') {
                return renderSelect(input);
            }

            if (input.type === 'checkbox') {
                return renderCheckBox(input);
            }

            if (input.type === 'textarea') {
                return renderTextArea(input);
            }

            return (
                <div key={input.name}>
                    <label>{input.label}</label>
                    <div>
                        <Field
                            name={input.name}
                            render={(props) => {
                                const { field } = props;
                                const { errors, touched } = props.form;
                                const hasError = errors[input.name] && touched[input.name] ? 'hasError' : '';
                                return (
                                    <input
                                        {...field}
                                        id={hasError}
                                        type='text'
                                    />
                                );
                            }}
                        />
                    </div>
                </div>
            );
        })
    }

    const getInitialValues = (inputs) => {
        // declare an empty initialValues object
        const initialValues = {};
        // loop over fields array
        // if prop does not exit in the initialValues object,
        // pluck off the name and value props and add it to the initialValues object;
        inputs.forEach(field => {
            if (!initialValues[field.name]) {
                initialValues[field.name] = field.value;
            }
        });

        //return initialValues object
        return initialValues;
    }

    //const render = () => {
        const initialValues = getInitialValues(props.fields);
        return (
            <div className="app">
                <h1>Dynamic Form</h1>
                <Formik
                    onSubmit={(values) => { console.log(values) }}
                    validationSchema={props.validation}
                    initialValues={initialValues}
                    render={(form) => {
                        const numErrors =  Object.keys(form.errors).length;
                        let legitError = false;
                        if (numErrors > 0)
                            Object.keys(form.errors).forEach(key => {
                                console.log(key, form.errors[key]);
                                if (form.touched[key] !== undefined)
                                    legitError = true;
                            });
                        const errorMessageShow = numErrors && legitError ? 'error' : 'hidden';
                        return <div>
                            <form onSubmit={form.handleSubmit}>
                                <div className={errorMessageShow}>
                                    Please correct the errors below
                                </div>
                                {renderFields(props.fields)}
                                <button type='submit' className='btn'>Submit</button>
                            </form>
                        </div>
                    }}
                />
            </div>
        );
    //}
}

export default DynamicForm;