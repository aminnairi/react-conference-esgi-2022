import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import eslint from "vite-plugin-eslint"

const port = Number(process.env.PORT)
const host = process.env.HOST

if (!port) {
    throw new Error("PORT not set in .env")
}

if (!host) {
    throw new Error("HOST not set in .env")
}

export default defineConfig({
    root: "sources",
    plugins: [
        react(),
        eslint({
            fix: true
        })
    ],
    server: {
        port,
        host
    }
})