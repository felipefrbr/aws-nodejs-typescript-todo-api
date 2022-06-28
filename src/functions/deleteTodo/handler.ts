import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Any } from 'json-schema-to-ts/lib/meta-types';
import TodoService from 'src/services/TodoService';

const todoService = new TodoService()

const deleteTodo: ValidatedEventAPIGatewayProxyEvent<Any> = async (event) => {

    const id = event.pathParameters.id

    await todoService.delete(id)

    return {
        statusCode: 204
    }

};

export const main = middyfy(deleteTodo);
