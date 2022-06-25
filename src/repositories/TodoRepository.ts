import { TodoItem } from "src/models/TodoItem";

const database = []

database.push({
    id: "1",
    name: "List 1",
    done: false,
    createdAt: "2022-06-25"
})

database.push({
    id: "2",
    name: "List 2",
    done: true,
    createdAt: "2022-06-20"
})

export default class TodoRepository{

    constructor(){
        
    }

    async listAll() : Promise<TodoItem[]> {
        return database
    }

    async save(todoItem: TodoItem): Promise<TodoItem>{
        database.push(todoItem)
        return todoItem
    }
}