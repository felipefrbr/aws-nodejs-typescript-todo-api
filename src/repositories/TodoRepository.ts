import { TodoItem } from "src/models/TodoItem";

export default class TodoRepository{

    private database = []

    constructor(){
        this.database.push({
            id: "1",
            name: "List 1",
            done: false,
            createdAt: "2022-06-25"
        })

        this.database.push({
            id: "2",
            name: "List 2",
            done: true,
            createdAt: "2022-06-20"
        })
    }

    async listAll() : Promise<TodoItem[]> {
        return this.database
    }
}