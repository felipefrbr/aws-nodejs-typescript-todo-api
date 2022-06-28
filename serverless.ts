import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import listTodos from '@functions/listTodos';
import createTodo from '@functions/createTodo';
import deleteTodo from '@functions/deleteTodo';

const serverlessConfiguration: AWS = {
  service: 'todo-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    stage: 'dev',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TODOS_TABLE: 'Todos-dev',
    },
  },
  // import the function via paths
  functions: { hello, listTodos, createTodo, deleteTodo },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      },
      stages: ['dev']
    }
  },
  resources: {
    Resources:{
      TodosDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'Todos-dev',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH'
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
