const express = require("express");
const { uuid, isUuid } = require("uuidv4")
const app = express();

app.use(express.json())

function logRequests(request, response, next) {
    const { method, url } = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next();

    console.timeEnd(logLabel)
}

function validateProjectId(request, response, next) {
    const { id } = request.params;
    const logLabel = `[${method.toUpperCase()}] ${url}`

    if (!isUuid(id)) return response.status(400).json({ error: "Invalid project ID" })

    return next()
}

let projects = [];

app.use(logRequests)
app.use('/projects/:id', validateProjectId)

app.get("/projects/", (request, response) => {
    const { title } = request.query
    const results = title
        ? project.filter(project => project.title.includes(title))
        : projects
    return response.json(results)
})

app.post("/projects", (request, response) => {
    const { title, owner } = request.body
    const project = { id: uuid(), title, owner }

    projects.push(project)

    return response.json(project)
})

app.put("/projects/:id", (request, response) => {
    const { id } = request.params
    const { title, owner } = request.body
    const projectIndex = projects.findIndex(project => id == project.id)

    const project = {
        id,
        title,
        owner
    }
    console.log(projectIndex, project)

    projects[projectIndex] = project

    return response.json({ project })
})

app.delete("/projects/:id", (request, response) => {
    const { id } = request.params
    const projectIndex = projects.findIndex(project => id === project.id)

    projects.splice(projectIndex, 1)

    return response.status(204).send()
})

app.listen(3000, () => {
    console.log("backend starts")
})