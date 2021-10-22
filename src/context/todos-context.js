import React, {useState} from 'react';

export const TodosContext = React.createContext(
    {
        todos: [],
        addTodo: () => {},
        deleteTodo: () => {},
        updateTodo: () => {}
    }
);

export const TodosContextProvider = (props) => {

    const [todos, setTodos] = useState([]); //create state for todos
    
    const addTodo = (todo) => {
        let oldTodos = todos;
        //this add it to the end of todo array
        oldTodos.push(todo);
        setTodos(oldTodos);
    } //we are gonna call it when we

    //delete todo
    const deleteTodo = (todoId) => {
        let oldTodos = todos;

        //find index location by the id property
        const todoIndex = todos.findIndex (
            (todo) => {
                return (todo.id === todoId)
            }
        );

        //delete 1 item from the todo list using its location, splicing it
        if (todoIndex !== -1) {
            oldTodos.splice(todoIndex, 1);
            setTodos([...oldTodos]); //... means you are copying some old array to this new array
        }
    }

    //update todo, we need a unique one to identify each one, so it means we need id
    const updateTodo = (todoId, isComplete) => {
        let oldTodos = todos;
        const todoIndex = todos.findIndex (
            (todo) => {
                return (todo.id === todoId)
            }
        );

        //user will be given -1 from line 30 if we cannot find their id, counting starts at 0, aka first todo will be return 0
        if (todoIndex !== -1) {
            //Update one item by index location in array
            oldTodos[todoIndex].isComplete = isComplete;

            //Update our todos
            setTodos(oldTodos);
        }
    }

    return (
        <TodosContext.Provider value={{todos: todos, addTodo: addTodo, updateTodo: updateTodo, deleteTodo: deleteTodo}}>
            {props.children}
        </TodosContext.Provider>
    )
}