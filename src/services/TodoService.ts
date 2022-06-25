import { TodoItem } from "src/models/TodoItem";

export default class TodoService{

   async list() : Promise<TodoItem[]> {
       
        const list = []

        list.push({
            id: "1",
            name: "List 1",
            done: false,
            createdAt: "2022-06-25"
        })

        list.push({
            id: "2",
            name: "List 2",
            done: true,
            createdAt: "2022-06-25"
        })

        return list
   }
}