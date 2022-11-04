import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './task.css';

function Task ( { label, onCheckBoxClick, onDeletedClick, onEditClick, timeAfterCreate, checked } ) {

    const [timeLeft, setTimeLeft] = useState(15*60)
    const [ isCounting, setIsCounting ] = useState(false);

    const getPadTime = (time) => time.toString().padStart(2, '0');

    const minValue = getPadTime(Math.floor(timeLeft / 60));
    const secValue = getPadTime(timeLeft - minValue * 60);




    // const [min, setMin] = useState(minValue);
    // const [sec, setSec] = useState(secValue);

    Task.defaultProps = {
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

    Task.propTypes = {
        checked: PropTypes.bool,
        onCheckBoxClick: PropTypes.func,
        label: PropTypes.string,
        timeAfterCreate: PropTypes.string,
        onEditClick: PropTypes.func,
        onDeletedClick: PropTypes.func,
    };


    useEffect(() => {
        const counterID = setInterval(() => {
            isCounting &&
                setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))
        }, 1000);
            if (timeLeft === 0) setIsCounting(false);
        return () => {
            clearInterval(counterID);
        };
    }, [timeLeft, isCounting]);

    const handlePause = () => {
        setIsCounting(false);

    };

    const handleStart = () => {
        setIsCounting( true);

    };

        return (
            <div className="view">
                <input className="toggle" type="checkbox" readOnly onClick={onCheckBoxClick} checked={checked}/>
                <div className="label">
                    <span role="presentation" className="title" onClick={onCheckBoxClick}>
                    {label}
                    </span>
                    <span className="description">

                        {
                            !isCounting ? (
                                <button type="button" className="icon icon-play" aria-label="start" onClick={handleStart}/>
                            ) : (
                                <button type="button" className="icon icon-pause" aria-label="stop" onClick={handlePause}/>
                            )
                        }
                        <span className="description__time-value">
                    {minValue}:{secValue}
                    </span>
                    </span>
                    <span className="created">created {timeAfterCreate} ago</span>
                </div>
                <button type="button" className="icon icon-edit" onClick={onEditClick} aria-label="pen"/>
                <button type="button" className="icon icon-destroy" onClick={onDeletedClick} aria-label="destroy"/>
            </div>
        );

}
export default Task;