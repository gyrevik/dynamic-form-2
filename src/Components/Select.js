import React, { Fragment } from 'react';
import { Field } from 'formik';

const Select = (props) => {
    const { input } = props;
    return (
        <Fragment>
            <label>{input.label}</label>
            <div>
                <Field
                    name={input.name}
                >
                    {props => {
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
                </Field>
            </div>
        </Fragment>
    );
}

export default Select;