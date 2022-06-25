import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  
  const responseBody = {
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  }

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  }
};

export const main = middyfy(hello);
