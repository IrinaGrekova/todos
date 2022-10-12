import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';


export default class NewTaskForm extends Component {
    state = {
        label: '',
        placeholder: 'What needs to be done?',
        minValue: '',
        secValue: '',
    };

    static defaultProps = {
        addNewItem: () => {},
    };

    static propTypes = {
        addNewItem: PropTypes.func,
    };
    // eslint-disable-next-line
    onLabelChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    // eslint-disable-next-line
    onSubmitForm = (e) => {
        const { addNewItem } = this.props;
        const { label, minValue, secValue } = this.state;
        if (e.key === 'Enter') {
            const trimLabel = label.replace(/ +/g, ' ').trim();

            if (trimLabel === '') {
                addNewItem('Label is missing', minValue, secValue);
            } else {
                addNewItem(trimLabel, minValue, secValue);
            }
            this.setState({
                label: '',
                placeholder: 'What needs to be done?',
                minValue: '',
                secValue: '',
            });
        }
    };

    render() {

        const { label, placeholder, minValue, secValue } = this.state;

        return (
            <form className="new-todo-form" onKeyPress={this.onSubmitForm}>
                <input
                    type="text"
                    className="new-todo"
                    name="label"
                    placeholder={placeholder}
                    onChange={this.onLabelChange}
                    value={label}
                />

                <input
                    className="new-todo-form__timer"
                    name="minValue"
                    placeholder="Min"
                    onChange={this.onLabelChange}
                    value={minValue}
                />

                <input
                    className="new-todo-form__timer"
                    name="secValue"
                    placeholder="Sec"
                    onChange={this.onLabelChange}
                    value={secValue}
                />
            </form>
        );
    }
}
