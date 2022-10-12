import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';

export default class Task extends Component {
    state = {
        min: this.props.minValue,
        sec: this.props.secValue,
        isCounting: false,
    };

    static defaultProps = {
        label: 'Label is missing',
        checked: false,
        timeAfterCreate: () => {
        },
        onEditClick: () => {
        },
        onDeletedClick: () => {
        },
        onCheckBoxClick: () => {
        },
    };

    static propTypes = {
        checked: PropTypes.bool,
        onCheckBoxClick: PropTypes.func,
        label: PropTypes.string,
        timeAfterCreate: PropTypes.string,
        onEditClick: PropTypes.func,
        onDeletedClick: PropTypes.func,
    };

    componentWillUnmount() {
        clearInterval(this.counterID);
    }

    minDecrement = () => {
        const {min} = this.state;
        this.setState({
            min: min - 1,
            sec: 59,
        });
    };

    secDecrement = () => {
        const {min, sec, isCounting} = this.state;
        const {onCheckBoxClick} = this.props;
        if (min === 0 && sec === 0 && isCounting === true) {
            onCheckBoxClick();
            clearInterval(this.counterID);
            this.setState({
                isCounting: false,
            });
        }
        if (sec > 0) {
            this.setState({
                sec: sec - 1,
                isCounting: true,
            });
        } else {
            this.minDecrement();
        }
    };

    handlePause = (e) => {
        e.stopPropagation();
        this.setState({isCounting: false});
        clearInterval(this.counterID);
    };

    handleStart = (e) => {
        e.stopPropagation();
        this.setState({isCounting: true});
        this.counterID = setInterval(() => {
            this.secDecrement();
        }, 1000);
    };

    render() {

        const {onCheckBoxClick, label, timeAfterCreate, onEditClick, onDeletedClick, checked} = this.props;
        const {min, sec, isCounting} = this.state;
        const buttonTimer = !isCounting ? (
            <button type="button" className="icon icon-play" aria-label="start" onClick={this.handleStart}/>
        ) : (
            <button type="button" className="icon icon-pause" aria-label="stop" onClick={this.handlePause}/>
        );
        return (
            <div className="view">
                <input className="toggle" type="checkbox" readOnly onClick={onCheckBoxClick} checked={checked}/>
                <div className="label">
                    <span role="presentation" className="title" onClick={onCheckBoxClick}>
                    {label}
                    </span>
                    <span className="description">
                    {buttonTimer}
                        <span className="description__time-value">
                    {min}:{sec}
                    </span>
                    </span>
                    <span className="created">created {timeAfterCreate} ago</span>
                </div>
                <button type="button" className="icon icon-edit" onClick={onEditClick} aria-label="pen"/>
                <button type="button" className="icon icon-destroy" onClick={onDeletedClick} aria-label="destroy"/>
            </div>
        );
    }
}