import * as uuid from 'uuid'

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

    async create(name: string): Promise<TodoItem> {
        const id = uuid.v4()
        const newItem = {
            id,
            name,
            done: false,
            createdAt: new Date().toISOString()
        }
        return await this.todoRepository.save(newItem)
    }

    async delete(id: string){
        await this.todoRepository.delete(id)
    }
}