import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import TodoService from 'src/services/TodoService';

import schema from './schema';

const todoService = new TodoService()

const listTodos: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {

    const list = await todoService.list()

    return {
        statusCode: 200,
        body: JSON.stringify(list)
    }

};

export const main = middyfy(listTodos);
