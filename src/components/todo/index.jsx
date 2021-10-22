import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from 'react';
import { TodosContext } from '../../context/todos-context';

import { GoTrashcan, GoCheck } from 'react-icons/go';

import './styles.css'

export const Todo = (props) => {

    const todosContext = useContext(TodosContext);

    const [ isComplete, setIsComplete ] = useState(false);

    useEffect( () => {
        setIsComplete(props.isComplete)
    }, []);
    //this essentially checking isComplete onload, and the second is every time it changes

    //the props is only what's given via input to the component and 'isComplete' is the current state of the component

    useEffect( () => {
        //everytime isComplete is updated, user clicks on the check mark, call the below code
        todosContext.updateTodo(props.todoId, isComplete);
    }, [isComplete]);

    //we can have multiple useEffect in the code

    const toggleCompleteTodo = () => {
        setIsComplete (!isComplete);
    }

    //deleteTodo function
    const deleteTodo = () => {
        todosContext.deleteTodo(props.todoId);
    }

    return (
        <div className={`todo ${props.color}`} style={ isComplete ? {opacity:0.2} : {}}>
            <div>
            <p className="todo-text"> { props.text } </p>
            <p className="todo-date"> { props.date } </p>
            </div>

            <div className="todo-btns">
                <button className="todo-complete" onClick={toggleCompleteTodo}>
                    <GoCheck className="todo-icon" style={{fontSize: "35px"}} />
                </button>
                <button className="todo-delete" onClick={deleteTodo}>
                    <GoTrashcan className="todo-icon" style={{fontSize: "35px"}} />
                </button>
            </div>
        </div>
    )
}

Todo.propTypes = {
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    priority: PropTypes.bool,
    isComplete: PropTypes.bool.isRequired
}

Todo.defaultProps = {
    text: "",
    date: "",
    color: "gray",
    priority: false,
    isComplete: false
}
