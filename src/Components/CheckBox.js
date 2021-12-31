import React, { Fragment } from 'react';
import { Field } from 'formik';

const CheckBox = (props) => {
    const { input } = props; 
    return (
        <Fragment>
            <label>{input.label}</label>
            <Field
                name={input.name}
            >
                {prop => {
                    const { field } = prop;
                    return (
                        <input
                            name={input.name}
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange} />
                    );
                }}
            </Field>
        </Fragment>
    );
}

export default CheckBox;