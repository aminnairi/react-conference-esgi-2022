import { ChangeEventHandler, useCallback, useState } from "react"
import { Todo } from "../entities/todos"

export const useTodos = () => {
    const [todos, setTodos] = useState<Array<Todo>>([])
    const [done, setDone] = useState(false)
    const [description, setDescription] = useState("")
    
    const onDescriptionChanged: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setDescription(event.target.value)
    }, [])

    const onDoneChanged: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setDone(event.target.checked)
    }, [])

    const addTodo: ChangeEventHandler<HTMLFormElement> = useCallback((event) => {
        event.preventDefault()

        if (!description) {
            return
        }

        const newTodo: Todo = {
            description,
            done
        }

        setTodos(oldTodos => [...oldTodos, newTodo])
        setDescription("")
        setDone(false)
    }, [description, done])

    const onTodoDescriptionChanged = useCallback((index: number): ChangeEventHandler<HTMLInputElement> => (event) => {
        setTodos(oldTodos => {
            return oldTodos.map((oldTodo, oldTodoIndex) => {
                if (oldTodoIndex === index) {
                    return {
                        ...oldTodo,
                        description: event.target.value
                    }
                }

                return oldTodo
            })
        })
    }, [])

    const onTodoDoneChanged = useCallback((index: number): ChangeEventHandler<HTMLInputElement> => (event) => {
        setTodos(oldTodos => {
            return oldTodos.map((oldTodo, oldTodoIndex) => {
                if (oldTodoIndex === index) {
                    return {
                        ...oldTodo,
                        done: event.target.checked
                    }
                }

                return oldTodo
            })
        })
    }, [])

    const onTodoDeleted = useCallback((index: number) => () => {
        setTodos(oldTodos => {
            return oldTodos.filter((oldTodo, oldTodoIndex) => {
                return oldTodoIndex !== index
            })
        })
    }, [])

    const checkTodos = useCallback(() => {
        setTodos(oldTodos => {
            const done = oldTodos.every(oldTodo => {
                return oldTodo.done
            })

            return oldTodos.map(oldTodo => {
                return {
                    ...oldTodo,
                    done: !done
                }
            })
        })
    }, [])

    const sortTodos = useCallback(() => {
        setTodos(oldTodos => {
            return [...oldTodos].sort((firstTodo, secondTodo) => {
                return firstTodo.description.localeCompare(secondTodo.description)
            })
        })
    }, [])

    return {
        todos,
        done,
        description,
        onDescriptionChanged,
        onDoneChanged,
        addTodo,
        onTodoDescriptionChanged,
        onTodoDoneChanged,
        checkTodos,
        sortTodos,
        onTodoDeleted
    }
}