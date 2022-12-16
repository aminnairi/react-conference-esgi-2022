import { ChangeEventHandler, FormEventHandler, Fragment, useCallback, useState } from "react"

interface Todo {
    description: string
    done: boolean
}

export const HomePage = () => {
    const [description, setDescription] = useState("")
    const [done, setDone] = useState(false)
    const [todos, setTodos] = useState<Array<Todo>>([])

    const updateDescription: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setDescription(event.target.value)
    }, [])

    const updateDone: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setDone(event.target.checked)
    }, [])

    const addTodo: FormEventHandler = useCallback((event) => {
        event.preventDefault()

        const newTodo: Todo = {
            description,
            done
        }

        setTodos(oldTodos => [...oldTodos, newTodo])
        setDescription("")
        setDone(false)
    }, [description, done])

    return (
        <Fragment>
            <h2>Add a todo</h2>
            <form onSubmit={addTodo}>
                <input type="checkbox" checked={done} onChange={updateDone} />
                <input type="text" value={description} onChange={updateDescription} autoFocus />
                <button type="submit">Add</button>
            </form>
            <h2>Todos</h2>
            <ul>
                {todos.map(todo => (
                    <li>{todo.done ? "DONE" : "TODO"} {todo.description}</li>
                ))}
            </ul>
        </Fragment>
    )
}
