import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';
import TasksFilter from "./index";

function TaskFilter ( { setFilterDataTodo } ) {

    const [ buttonClicked, setButtonClicked] = useState({

        allButtonClicked: true,
        activeButtonClicked: false,
        completedButtonClicked: false,
    })


    TasksFilter.defaultProps = {
        setFilterData: () => {},
    };

    TasksFilter.propTypes = {
        setFilterData: PropTypes.func,
    };

    const onClickButton = (e) => {
        const buttonClicked = e.target.innerText.toLowerCase();
        if (buttonClicked === 'all') {
            setButtonClicked({
                allButtonClicked: true,
                activeButtonClicked: false,
                completedButtonClicked: false,
            });
        } else if (buttonClicked === 'active') {
            setButtonClicked({
                allButtonClicked: false,
                activeButtonClicked: true,
                completedButtonClicked: false,
            });
        } else {
            setButtonClicked({
                allButtonClicked: false,
                activeButtonClicked: false,
                completedButtonClicked: true,
            });
        }
    };


        return (
            <ul className="filters">
                <li>
                    <button
                        type="button"
                        className={buttonClicked ? 'selected' : ''}
                        onClick={(e) => {
                            setFilterDataTodo(e);
                            onClickButton(e);
                        }}
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={buttonClicked ? 'selected' : ''}
                        onClick={(e) => {
                            setFilterDataTodo(e);
                            onClickButton(e);
                        }}
                    >
                        Active
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={buttonClicked ? 'selected' : ''}
                        onClick={(e) => {
                            setFilterDataTodo(e);
                            onClickButton(e);
                        }}
                    >
                        Completed
                    </button>
                </li>
            </ul>
        );
}

export default TaskFilter;