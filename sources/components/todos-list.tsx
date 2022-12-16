import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import IconDelete from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import { Todo } from "../entities/todos"
import { ChangeEventHandler, MouseEventHandler } from "react"

interface TodosListProps {
    todos: Array<Todo>,
    onTodoDescriptionChanged: (index: number) => ChangeEventHandler<HTMLInputElement>
    onTodoDoneChanged: (index: number) => ChangeEventHandler<HTMLInputElement>,
    onTodoDeleted: (index: number) => MouseEventHandler
}

export const TodosList = ({ todos, onTodoDescriptionChanged, onTodoDoneChanged, onTodoDeleted }: TodosListProps) => {
    return (
        <Grid justifyContent="center" container>
            <Grid item>
                <List>
                    {todos.map((todo, todoIndex) => (
                        <ListItem>
                            <Checkbox
                                checked={todo.done}
                                onChange={onTodoDoneChanged(todoIndex)} />
                            <TextField
                                variant="standard"
                                value={todo.description}
                                placeholder="Ex: Clean the house"
                                onChange={onTodoDescriptionChanged(todoIndex)} />
                            <Button onClick={onTodoDeleted(todoIndex)}>
                                <IconDelete />
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}