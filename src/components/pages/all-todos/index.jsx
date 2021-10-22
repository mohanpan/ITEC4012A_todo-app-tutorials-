import "./styles.css";
import { Todo } from "../../todo/index";
import { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../../context/todos-context';

export const AllTodosPage = () => {

    const [todoElements, setTodoElements] = useState([]);
    
    const todosContext = useContext(TodosContext);

    useEffect (() => {
        //this is going to be java mix with HTML, the staff inside todo, i.e.: id, title, date, etc.
        const todoElems = todosContext.todos.map( (todo) => {
            return (
                //you give them a key so it is unique for react
                <Todo key={todo.id} text={todo.title} date={todo.date} isComplete={todo.isComplete} todoId={todo.id}></Todo>
            )
        } )
        setTodoElements(todoElems);
    }, [todosContext.todos])

    //this auto dynamicly generate all the todos,
    return (
        <div className="todos-container">
            {todoElements}  
        </div>
    )
}