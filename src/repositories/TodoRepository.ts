import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from "src/models/TodoItem";

export default class TodoRepository{

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todoTable = process.env.TODOS_TABLE
    ) {}

    async listAll() : Promise<TodoItem[]> {
        const result = await this.docClient.scan({
            TableName: this.todoTable
        }).promise()
      
        return result.Items as TodoItem[]
    }

    async save(todoItem: TodoItem): Promise<TodoItem>{
        await this.docClient.put({
            TableName: this.todoTable,
            Item: todoItem
        }).promise()
    
        return todoItem
    }

    async updateTodo(partialTodo: Partial<TodoItem>){
        const updated = await this.docClient.update({
            TableName: this.todoTable,
            Key: { 'id': partialTodo.id },
            UpdateExpression: 'set #name = :name, done = :done',
            ExpressionAttributeNames: {
            '#name': 'name'
            },
            ExpressionAttributeValues: {
            ':name': partialTodo.name,
            ':done': partialTodo.done
            },
            ReturnValues: 'ALL_NEW'
        }).promise()
        
        return updated.Attributes as TodoItem
    }

    async delete(id: string){
        await this.docClient.delete({
            TableName: this.todoTable,
            Key: { 'id': id }
        }).promise()
    }
}

function createDynamoDBClient() { 
    if (process.env.IS_OFFLINE) {
      return new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      })
    }
  
    return new AWS.DynamoDB.DocumentClient()
  }