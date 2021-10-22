import { useForm } from "react-hook-form";
import { Input } from '../input-field';
import { v1 as uuidv1 } from 'uuid';
import { useContext } from 'react';
import { TodosContext } from '../../context/todos-context';
import { useHistory } from 'react-router-dom';

import "./styles.css"

export const NewTodoForm = () => {

    const todoContext = useContext(TodosContext);
    let history = useHistory();

    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data) => {
        const todo = data;

        //add a unique id to the todo
        todo.id = uuidv1(); //whenever we submit a new todo, we get a new id

        //default status of false
        todo.isComplete = false;

        //add the todo to the global state / context
        todoContext.addTodo(todo);
        console.log("Added new todo", todo);

        // navigate to the home page
        history.push("/"); //so the latest thing in history is the current page and you can change that by just pushing to it
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Add input fields*/}
            <Input
                type="text"
                name="title"
                label="Todo (e.g do laundry)"
                errors={errors}
                register={register}
                validationSchema={
                    {
                        required: "Todo text is required",
                        minLength: {
                            value: 3,
                            message: "Please enter at least 3 characters"
                        }
                    }
                }
                required
            />

            <Input
                type="date"
                name="date"
                label="Due Date"
                errors={errors}
                register={register}
                validationSchema={
                    {
                        required: "Todo due date is required"
                    }
                }
                required
            />

            <input type="submit"/>
        </form>
    )
}