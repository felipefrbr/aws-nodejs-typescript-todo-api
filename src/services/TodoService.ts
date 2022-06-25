import { TodoItem } from "src/models/TodoItem";
import TodoRepository from "src/repositories/TodoRepository";

export default class TodoService{

    todoRepository: TodoRepository

    constructor(){
        this.todoRepository = new TodoRepository()
    }

    async list() : Promise<TodoItem[]> {
        return await this.todoRepository.listAll()
    }
}