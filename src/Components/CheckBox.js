import React, { Fragment } from 'react';
import { Field } from 'formik';

const CheckBox = (input, key) => {
    return (
        <Fragment key={input.name}>
            <label>{input.label}</label>
            <Field
                name={input.name}
            >
                {prop => {
                    const { field } = prop;
                    return (
                        <input
                            key={key}
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