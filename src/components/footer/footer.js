import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../tasks-filter';
import './footer.css';

const Footer = ({ notCompletedCount, clearCompleted, setFilterData }) => (

    <footer className="footer">
        <span className="todo-count">{`${notCompletedCount}  items left`}</span>
        <TaskFilter setFilterData={setFilterData} />
        <button type="button" className="clear-completed" onClick={clearCompleted}>
            Clear completed
        </button>
    </footer>
);
Footer.defaultProps = {
    notCompletedCount: 0,
    clearCompleted: () => {},
    setFilterData: () => {},
};
Footer.propTypes = {
    notCompletedCount: PropTypes.number,
    clearCompleted: () => {},
    setFilterData: () => {},
};
export default Footer;




