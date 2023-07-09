import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'CartServiceStack', {
  env: { region: 'us-east-1' },
});

new NodejsFunction(stack, 'cartServiceLambda', {
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: 'dist/main.js',
  handler: 'handler',
  environment: {
    PGUSER: "postgres",
    PGHOST: "testinstanc.cgrpfncy2bgc.us-east-1.rds.amazonaws.com",
    PGPASSWORD: "test",
    PGDATABASE: "test",
    PGPORT: 5432,
  },
});
