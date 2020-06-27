import express from "express";
import { helloWorld } from "./router"
const app = express();

app.get("/", (request, response) => {
    helloWorld(request, response)
})

app.listen(3333)