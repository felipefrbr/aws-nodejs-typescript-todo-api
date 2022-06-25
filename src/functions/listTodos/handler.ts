import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Any } from 'json-schema-to-ts/lib/meta-types';
import TodoService from 'src/services/TodoService';

const todoService = new TodoService()

const listTodos: ValidatedEventAPIGatewayProxyEvent<Any> = async () => {

    const list = await todoService.list()

    return {
        statusCode: 200,
        body: JSON.stringify(list)
    }

};

export const main = middyfy(listTodos);
