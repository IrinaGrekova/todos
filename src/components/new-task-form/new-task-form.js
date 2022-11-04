import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';


function NewTaskForm ({addNewItem, minValue, secValue}) {

    const [label, setLabel] = useState('')

    NewTaskForm.defaultProps = {
        addNewItem: () => {},
    };

    NewTaskForm.propTypes = {
        addNewItem: PropTypes.func,
    };


    // eslint-disable-next-line
    const onLabelChange = (e) => {
        setLabel({
            [e.target.name]: e.target.value,
        });
    };
    // eslint-disable-next-line
    const onSubmitForm = (e) => {

        if (e.key === 'Enter') {
            const trimLabel = label.replace(/ +/g, ' ').trim();

            if (trimLabel === '') {
                addNewItem('Label is missing', minValue, secValue);
            } else {
                addNewItem(trimLabel, minValue, secValue);
            }
            setLabel({
                label: '',
                placeholder: 'What needs to be done?',
                minValue: '',
                secValue: '',
            });
        }
    };


        return (
            <form className="new-todo-form" onKeyPress={onSubmitForm}>
                <input
                    type="text"
                    className="new-todo"
                    name="label"
                    placeholder='What needs to be done?'
                    onChange={onLabelChange}
                    value={label}
                />

                <input
                    className="new-todo-form__timer"
                    name="minValue"
                    placeholder="Min"
                    onChange={onLabelChange}
                    value={minValue}
                />

                <input
                    className="new-todo-form__timer"
                    name="secValue"
                    placeholder="Sec"
                    onChange={onLabelChange}
                    value={secValue}
                />
            </form>
        );
}

export default NewTaskForm;