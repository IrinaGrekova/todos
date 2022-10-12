import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Task from '../task';
import ChangeTaskForm from '../change-task-form';
import './task-list.css';


const TaskList = ({ todos, filterData, onCheckBoxClick, onDeletedClick, onEditClick, onChangeLabel }) => {
    const listElements = todos.map((item) => {
    const { id, minValue, secValue } = item;
    const timeAfterCreate = formatDistanceToNow(new Date(item.dateCreate));
        let classNames = 'active';
        let checked = false;
        if (item.completed) {
            classNames = 'completed';
            checked = true;
        }
        if (item.editing) {
            classNames = 'editing';
        }
        if (filterData === 'all') {
            return (
                <li key={id} className={classNames}>
                    <Task
                        label={item.label}
                        timeAfterCreate={timeAfterCreate}
                        checked={checked}
                        minValue={minValue}
                        secValue={secValue}
                        onCheckBoxClick={() => {
                            onCheckBoxClick(id);
                        }}
                        onDeletedClick={() => {
                            onDeletedClick(id);
                        }}
                        onEditClick={() => {
                            onEditClick(id);
                        }}
                    />
                    {item.editing ? (
                        <ChangeTaskForm id={id} label={item.label} onChangeLabel={onChangeLabel} />
                    ) : null}
                </li>
            );
        }
        if (classNames === filterData || classNames === 'editing') {
            return (
                <li key={id} className={classNames}>
                    <Task
                        label={item.label}
                        timeAfterCreate={timeAfterCreate}
                        className={classNames}
                        checked={checked}
                        minValue={minValue}
                        secValue={secValue}
                        onCheckBoxClick={() => {
                            onCheckBoxClick(id);
                        }}
                        onDeletedClick={() => {
                            onDeletedClick(id);
                        }}
                        onEditClick={() => {
                            onEditClick(id);
                        }}
                    />
                    {item.editing ? (
                        <ChangeTaskForm id={id} label={item.label} onChangeLabel={onChangeLabel} />
                    ) : null}
                </li>
            );
        }
        return null;
    });
    return <ul className="todo-list">{listElements}</ul>;
};
TaskList.defaultProps = {
    filterData: 'all',
    todos: [],
    onCheckBoxClick: () => {},
    onDeletedClick: () => {},
    onEditClick: () => {},
    onChangeLabel: () => {},
};
TaskList.propTypes = {
    filterData: PropTypes.string,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCheckBoxClick: PropTypes.func,
    onDeletedClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onChangeLabel: PropTypes.func,
};

export default TaskList;


