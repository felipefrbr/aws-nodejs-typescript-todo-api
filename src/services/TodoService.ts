import { TodoItem } from "src/models/TodoItem";
import TodoRepository from "src/repositories/TodoRepository";

export default class TodoService{

    private todoRepository: TodoRepository

    constructor(todoRepository: TodoRepository = new TodoRepository()){
        this.todoRepository = todoRepository
    }

    async list() : Promise<TodoItem[]> {
        return await this.todoRepository.listAll()
    }
}