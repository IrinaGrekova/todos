import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';
import './app.css';

export default class App extends Component {

    state = {
        todoDate: [
            this.createTodoItem('Drink coffee', 15, 0),
            this.createTodoItem('Have a lunch', 15, 0),
            this.createTodoItem('Learn React', 15, 0),
            this.createTodoItem('Build React App', 15, 0),
            this.createTodoItem('Cook a dinner', 15, 0),
            this.createTodoItem('Do homework', 15, 0),
        ],
        filterData: 'all',
    };

    static defaultProps = {
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

    static propTypes = {
        todoDate: PropTypes.instanceOf(Array).isRequired,
        filterData: PropTypes.string,
    };

    addItem = (label, minValue, secValue) => {
        const newItem = this.createTodoItem(label, minValue, secValue);
        this.setState(({ todoDate }) => {
            const newTodoDate = [...todoDate, newItem];
            return {
                todoDate: newTodoDate,
            };
        });
    };

    changeLabel = (id, label) => {
        this.setState(({ todoDate }) => {
            const newTodoDate = todoDate.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        label,
                        completed: false,
                        editing: false,
                    };
                }
                return el;
            });
            return {
                todoDate: newTodoDate,
            };
        });
    };

    editingItem = (id) => {
        this.setState(({ todoDate }) => {
            const newTodoDate = todoDate.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        editing: true,
                    };
                }
                return el;
            });
            return {
                todoDate: newTodoDate,
            };
        });
    };

    completedItem = (id) => {
        this.setState(({ todoDate }) => {
            const newTodoDate = todoDate.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        completed: !el.completed,
                    };
                }
                return el;
            });
            return {
                todoDate: newTodoDate,
            };
        });
    };

    deletedItem = (id) => {
        this.setState(({ todoDate }) => {
            const newTodoDate = todoDate.filter((el) => el.id !== id);
            return {
                todoDate: newTodoDate,
            };
        });
    };

    clearCompleted = () => {
        this.setState(({ todoDate }) => {
            const newTodoDate = todoDate.filter((el) => el.completed === false);
            return {
                todoDate: newTodoDate,
            };
        });
    };

    // eslint-disable-next-line
    setFilterData = (e) => {
        this.setState({
            filterData: e.target.innerText.toLowerCase(),
        });
    };

    createTodoItem(label, minValue, secValue) {
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

    render() {
        const { todoDate, filterData } = this.state;
        const notCompletedCount = todoDate.filter((el) => !el.completed).length;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addNewItem={this.addItem} />
                </header>
                <section className="main">
                    <TaskList
                        todos={todoDate}
                        onCheckBoxClick={this.completedItem}
                        onDeletedClick={this.deletedItem}
                        onEditClick={this.editingItem}
                        onChangeLabel={this.changeLabel}
                        filterData={filterData}
                    />

                    <Footer
                        notCompletedCount={notCompletedCount}
                        clearCompleted={this.clearCompleted}
                        setFilterData={this.setFilterData}
                    />
                </section>
            </section>
        );
    }
}