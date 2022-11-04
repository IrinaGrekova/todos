import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './change-task-form.css';

export default class ChangeTaskForm extends Component {
    state = {
        newLabel: '',
    };

    static defaultProps = {
        label: '',
        onChangeLabel: () => {},
    };

    static propTypes = {
        label: PropTypes.string,
        id: PropTypes.number.isRequired,
        onChangeLabel: PropTypes.func,
    };

    onLabelChange = (e) => {
        this.setState({
            newLabel: e.target.value.replace(/ +/g, ' ').trim(),
        });
    };

    onKeyPress = (e) => {
        const { onChangeLabel, id, label } = this.props;
        const { newLabel } = this.state;
        if (e.key === 'Enter') {
            if (newLabel === '') {
                onChangeLabel(id, label);
            } else {
                onChangeLabel(id, newLabel);
            }
        }
    };

    render() {
        const { label } = this.props;

        return (
            <input
                type="text"
                className="edit"
                placeholder={label}
                onChange={this.onLabelChange}
                onKeyPress={this.onKeyPress}
            />
        );
    }
}