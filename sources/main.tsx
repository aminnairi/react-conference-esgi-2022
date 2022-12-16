import "./index.css"

import { Fragment } from "react"
import { Routes, Route } from "react-router"
import { Header } from "./components/header"
import { HomePage } from "./pages/home"
import { NotFoundPage } from "./pages/not-found"
import { TodosPage } from "./pages/todos"

export const Main = () => {
    return (
        <Fragment>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/todos" element={<TodosPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Fragment>
    )
}