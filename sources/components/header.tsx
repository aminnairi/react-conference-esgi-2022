import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"

export const Header = () => {
    const navigate = useNavigate()

    const navigateToHome = useCallback(() => {
        navigate("/")
    }, [navigate])

    const navigateToTodos = useCallback(() => {
        navigate("/todos")
    }, [navigate])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={navigateToHome}>
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        onClick={navigateToTodos}>
                        Todos
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}