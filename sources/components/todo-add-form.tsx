import { ChangeEventHandler, FormEventHandler } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"

export interface TodoAddFormProps {
    onDescriptionChanged: ChangeEventHandler<HTMLInputElement>
    onDoneChanged: ChangeEventHandler<HTMLInputElement>
    done: boolean
    description: string
    onSubmit: FormEventHandler<HTMLFormElement>
}

export const TodoAddForm = ({ onSubmit, done, description, onDescriptionChanged, onDoneChanged }: TodoAddFormProps) => {
    return (
        <form onSubmit={onSubmit}>
            <Grid spacing={3} justifyContent="center" container>
                <Grid item>
                    <Checkbox
                        checked={done}
                        onChange={onDoneChanged} />
                </Grid>
                <Grid item>
                    <TextField
                        variant="standard"
                        value={description}
                        onChange={onDescriptionChanged}
                        placeholder="Ex: Do the dishes"
                        autoFocus />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
