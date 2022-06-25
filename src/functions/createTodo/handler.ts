import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import TodoService from 'src/services/TodoService';

import schema from './schema';

const todoService = new TodoService()

const createTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const newTodoItem = await todoService.create(event.body.name)

    return {
        statusCode: 201,
        body: JSON.stringify(newTodoItem)
    }

};

export const main = middyfy(createTodo);
