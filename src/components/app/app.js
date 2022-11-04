import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';
import './app.css';

function App () {

    const todos =

        [
            createTodoItem('Drink coffee', 15, 0),
            createTodoItem('Have a lunch', 15,0),
            createTodoItem('Learn React', 15, 0),
            createTodoItem('Build React App', 15, 0),
            createTodoItem('Cook a dinner', 15, 0),
            createTodoItem('Do homework', 15, 0),
        ]

    const [ todoDate, setTodoDate ] = useState (todos);
    const [ filterData, setFilterData ] = useState('all');


    const addItem = (label, minValue, secValue) => {
        const newItem = createTodoItem(label, minValue, secValue);
        setTodoDate([...todoDate, newItem])
    };

    const changeLabel = (id, label) => {
        setTodoDate([...todoDate.map((el) => {
            if (el.id === id) {
                return {
                    ...el,
                    label,
                    completed: false,
                    editing: false,
                };
            }
            return el;
        })])
    };


    const editingItem = (id) => {
        setTodoDate([...todoDate.map((el) => {
            if (el.id === id) {
                return {
                    ...el,
                    editing: true,
                };
            }
            return el;
        })])
    };


    const completedItem = (id) => {
        setTodoDate([...todoDate.map((el) => {
            if (el.id === id) {
                return {
                    ...el,
                    completed: !el.completed,
                };
            }
            return el;
        })]);
        }


    const deletedItem = (id) => {
        setTodoDate([...todoDate.filter((el) => el.id !== id)])
        };

    const clearCompleted = () => {
        setTodoDate([...todoDate.filter((el) => el.completed === false)])
    }


    // eslint-disable-next-line
    const setFilterDataTodo = (e) => {
        setFilterData(e.target.innerText.toLowerCase());
    };

    function createTodoItem(label, minValue, secValue) {
        const id = Date.now() + Math.floor(Math.random() * 10000);
        const trimLabel = label.replace(/ +/g, ' ').trim();
        let minValueNumber = +minValue;
        let secValueNumber = +secValue;
        if (secValueNumber >60 ){
            minValueNumber +=Math.trunc(secValueNumber/60)
            secValueNumber -= Math.trunc(secValueNumber/60)*60
        }
        return {
            id,
            label: trimLabel,
            dateCreate: new Date(),
            completed: false,
            editing: false,
            minValue: minValueNumber,
            secValue: secValueNumber,
        };
    }

        const notCompletedCount = todoDate.filter((el) => !el.completed).length;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addNewItem={addItem} />
                </header>
                <section className="main">
                    <TaskList
                        todos={todoDate}
                        setTodoDate = {setTodoDate}
                        onCheckBoxClick={completedItem}
                        onDeletedClick={deletedItem}
                        onEditClick={editingItem}
                        onChangeLabel={changeLabel}
                        filterData={filterData}
                    />

                    <Footer
                        notCompletedCount={notCompletedCount}
                        clearCompleted={clearCompleted}
                        filterData={filterData}
                        setFilterDataTodo={setFilterDataTodo}

                    />
                </section>
            </section>
        );
}

App.defaultProps = {
    totoDate: [
        {
            id: 101,
            label: '',
            dateCreate: new Date(),
            completed: false,
            editing: false,
            minValue: 15,
            secValue: 30,
        },
    ],
    filterData: 'all',
};

App.propTypes = {
    todoDate: PropTypes.instanceOf(Array).isRequired,
    filterData: PropTypes.string,
};

export default App;