import { Fragment, FormEventHandler, useState, ChangeEventHandler, MouseEventHandler, useMemo, useEffect } from "react"

enum Priority {
    High = "HIGH",
    Medium = "MEDIUM",
    Low = "LOW"
}

interface Todo {
    id: string
    description: string
    done: boolean,
    imagePath: string
    priority: Priority
}

interface TodosProps {
    todos: Array<Todo>,
    onTodoDoneChanged: (index: number) => ChangeEventHandler<HTMLInputElement>
    onTodoDescriptionChanged: (index: number) => ChangeEventHandler<HTMLInputElement>
    onTodoDeleted: (index: number) => MouseEventHandler
    onPriorityChanged: ChangeEventHandler<HTMLSelectElement>
}

const Todos = ({ todos, onTodoDoneChanged, onTodoDescriptionChanged, onTodoDeleted, onPriorityChanged }: TodosProps) => {
    return (
        <ul>
            {todos.map((todo, todoIndex) => (
                <li key={todo.id}>
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={onTodoDoneChanged(todoIndex)} />
                    <input
                        type="text"
                        value={todo.description}
                        onChange={onTodoDescriptionChanged(todoIndex)} />
                    <select value={todo.priority} onChange={onPriorityChanged}>
                        <option value={Priority.High}>High</option>
                        <option value={Priority.Medium}>Medium</option>
                        <option value={Priority.Low}>Low</option>
                    </select>
                    <img src={todo.imagePath} alt="Image" />
                    <button onClick={onTodoDeleted(todoIndex)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    )
}

export const HomePage = () => {
    const [description, setDescription] = useState("")
    const [done, setDone] = useState(false)
    const [todos, setTodos] = useState<Array<Todo>>([])
    const [priority, setPriority] = useState(Priority.Low)
    
    const sortedTodos = useMemo(() => {
        return [...todos].sort((firstTodo, secondTodo) => {
            if (firstTodo.priority === Priority.Low) {
                if (secondTodo.priority === Priority.Low) {
                    return 0
                }

                return -1
            }

            if (firstTodo.priority === Priority.Medium) {
                if (secondTodo.priority === Priority.Medium) {
                    return 0
                }

                if (secondTodo.priority === Priority.Low) {
                    return 1
                }

                return -1
            }

            return 1
        })
    }, [todos])

    const doneTodos = useMemo(() => {
        return sortedTodos.filter(todo => {
            return todo.done
        })
    }, [sortedTodos])

    const undoneTodos = useMemo(() => {
        return sortedTodos.filter(todo => {
            return !todo.done
        })
    }, [sortedTodos])

    const addTodo: FormEventHandler = (event) => {
        event.preventDefault()

        const randomId = Math.floor(Math.random() * 100)

        const newTodo = {
            id: window.crypto.randomUUID(),
            description,
            done,
            imagePath: `https://placedog.net/100/100?id=${randomId}`,
            priority
        }

        setTodos([...todos, newTodo])
        setDescription("")
        setDone(false)
    }

    const onTodoDescriptionChanged = (index: number): ChangeEventHandler<HTMLInputElement> => (event) => {
        setTodos(todos.map((todo, todoIndex) => {
            if (todoIndex === index) {
                return {
                    ...todo,
                    description: event.target.value
                }
            }

            return todo
        }))
    }

    const onTodoDoneChanged = (index: number): ChangeEventHandler<HTMLInputElement> => (event) => {
        setTodos(todos.map((todo, todoIndex) => {
            if (todoIndex === index) {
                return {
                    ...todo,
                    done: event.target.checked
                }
            }

            return todo
        }))
    }

    const onTodoDeleted = (index: number): MouseEventHandler => () => {
        setTodos(todos.filter((todo, todoIndex) => {
            return todoIndex !== index
        }))
    }

    const onPriorityChanged: ChangeEventHandler<HTMLSelectElement> = (event) => {
        if (event.target.value === Priority.Low) {
            setPriority(Priority.Low)
        } else if (event.target.value === Priority.Medium) {
            setPriority(Priority.Medium)
        } else {
            setPriority(Priority.High)
        }
    }

    return (
        <Fragment>
            <h2>Create todo</h2>
            <form onSubmit={addTodo}>
                <input
                    type="checkbox"
                    checked={done}
                    onChange={(event) => setDone(event.target.checked)} />
                <input
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)} />
                <select value={priority} onChange={onPriorityChanged}>
                    <option value={Priority.High}>High</option>
                    <option value={Priority.Medium}>Medium</option>
                    <option value={Priority.Low}>Low</option>
                </select>
                <button type="submit">Add</button>
            </form>
            <h2>Undone todos</h2>
            <Todos
                todos={undoneTodos}
                onTodoDeleted={onTodoDeleted}
                onTodoDescriptionChanged={onTodoDescriptionChanged}
                onTodoDoneChanged={onTodoDoneChanged}
                onPriorityChanged={() => {}} />
            <h2>Done todos</h2>
            <Todos
                todos={doneTodos}
                onTodoDeleted={onTodoDeleted}
                onTodoDescriptionChanged={onTodoDescriptionChanged}
                onTodoDoneChanged={onTodoDoneChanged}
                onPriorityChanged={() => {}} />
        </Fragment>
    )
}
