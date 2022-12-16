import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { useTodos } from "../hooks/todos"
import { TodoAddForm } from "../components/todo-add-form"
import { TodosList } from "../components/todos-list"

export const TodosPage = () => {
    const {
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
    } = useTodos()

    return (
        <Container>
            <Stack
                direction="column" 
                spacing={5}
                sx={{marginTop: "80px"}}>
                <Typography
                    variant="h3"
                    component="h2"
                    align="center">
                    New Todo
                </Typography>
                <TodoAddForm
                    onSubmit={addTodo}
                    done={done}
                    description={description}
                    onDoneChanged={onDoneChanged}
                    onDescriptionChanged={onDescriptionChanged} />
                <Typography
                    variant="h3"
                    component="h2"
                    align="center">
                    Todos List
                </Typography>
                <Grid spacing={1} justifyContent="center" container>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={checkTodos}>
                            Check All
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={sortTodos}>
                            Sort
                        </Button>
                    </Grid>
                </Grid>
                <TodosList
                    todos={todos}
                    onTodoDescriptionChanged={onTodoDescriptionChanged}
                    onTodoDoneChanged={onTodoDoneChanged}
                    onTodoDeleted={onTodoDeleted} />
            </Stack>
        </Container>
    )
}