import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { TodoItem } from 'src/models/TodoItem';
import TodoService from 'src/services/TodoService';

import schema from './schema';

const todoService = new TodoService()

const updateTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const id = event.pathParameters.id

    const todo: Partial<TodoItem> = { ...event.body, id }

    const updated = await todoService.update(todo)

    return {
        statusCode: 200,
        body: JSON.stringify(updated)
    }

};

export const main = middyfy(updateTodo);