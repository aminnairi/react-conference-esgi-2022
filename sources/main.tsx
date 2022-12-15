import { Routes, Route } from "react-router"
import { HomePage } from "./pages/home"

export const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}