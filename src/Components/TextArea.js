import React, { Fragment } from 'react';
import { Field } from 'formik';

const TextArea = (props) => {
    const { input, index } = props;
    return (
        <Fragment key={input.name}>
            <label>{input.label}</label>
            <div>
                <Field
                    name={input.name}
                >
                    {prop => {
                        const { field } = prop;
                        const { errors, touched } = prop.form;
                        const hasError = errors[input.name] && touched[input.name] ? 'hasError' : '';
                        return (
                            <div>
                                <textarea key={index} {...field} id={hasError}>
                                </textarea>
                            </div>
                        );
                    }}
                </Field>
            </div>
        </Fragment>
    );
}

export default TextArea;