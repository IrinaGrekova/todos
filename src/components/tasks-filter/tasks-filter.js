import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

export default class TaskFilter extends Component {

    state = {
        allButtonClicked: true,
        activeButtonClicked: false,
        completedButtonClicked: false,
    };

    static defaultProps = {
        setFilterData: () => {},
    };

    static propTypes = {
        setFilterData: PropTypes.func,
    };

    onClickButton = (e) => {
        const buttonClicked = e.target.innerText.toLowerCase();
        if (buttonClicked === 'all') {
            this.setState({
                allButtonClicked: true,
                activeButtonClicked: false,
                completedButtonClicked: false,
            });
        } else if (buttonClicked === 'active') {
            this.setState({
                allButtonClicked: false,
                activeButtonClicked: true,
                completedButtonClicked: false,
            });
        } else {
            this.setState({
                allButtonClicked: false,
                activeButtonClicked: false,
                completedButtonClicked: true,
            });
        }
    };

    render() {
        const { setFilterData } = this.props;
        const { allButtonClicked } = this.state;
        const { activeButtonClicked } = this.state;
        const { completedButtonClicked } = this.state;
        return (
            <ul className="filters">
                <li>
                    <button
                        type="button"
                        className={allButtonClicked ? 'selected' : ''}
                        onClick={(e) => {
                            setFilterData(e);
                            this.onClickButton(e);
                        }}
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={activeButtonClicked ? 'selected' : ''}
                        onClick={(e) => {
                            setFilterData(e);
                            this.onClickButton(e);
                        }}
                    >
                        Active
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={completedButtonClicked ? 'selected' : ''}
                        onClick={(e) => {
                            setFilterData(e);
                            this.onClickButton(e);
                        }}
                    >
                        Completed
                    </button>
                </li>
            </ul>
        );
    }
}