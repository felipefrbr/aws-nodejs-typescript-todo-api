import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import TodoService from 'src/services/TodoService';

const todoService = new TodoService()

const deleteTodo: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {

    const id = event.pathParameters.id

    await todoService.delete(id)

    return {
        statusCode: 204,
        body: null
    }

};

export const main = middyfy(deleteTodo);
