import { Request, Response } from "express"
import createUser from "./services/CreateUser"

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        name: "gatao",
        email: "gatao@gmail.com",
        password: "123545",
        techs: [{ title: "javascript", experience: 100 }]
    })
    return response.json({ message: "hello world" })
}