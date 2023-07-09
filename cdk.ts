import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';

import * as apiGateway from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";

const app = new cdk.App();

const stack = new cdk.Stack(app, 'CartServiceStack', {
  env: {
    account: '536622564201',
    region: 'us-east-1' },
});

const vpc = Vpc.fromLookup(stack, "vpc-06c8f001a6535aa65", { vpcId: "vpc-06c8f001a6535aa65" });

const sharedLambdaProps = {
  runtime: lambda.Runtime.NODEJS_18_X,
  vpc,
  allowPublicSubnet: true,
  environment: {
    PRODUCT_AWS_REGION: 'us-east-1',
    PG_HOST: "testinstance.cqipwbge8ydz.us-east-1.rds.amazonaws.com",
    PG_PORT: "5432",
    PG_DATABASE: "testNameDatabase",
    PG_USERNAME: "postgres",
    PG_PASSWORD: "QvWghSx9OLBW2vQ1KHzJ",
  },
  bundling: {
    externalModules: [
      'pg-native',
      'sqlite3',
      'pg-query-stream',
      'oracledb',
      'better-sqlite3',
      'tedious',
      'mysql',
      'mysql2',
    ],
  },
};

const cartApiLambda = new NodejsFunction(stack, 'CartServiceLambda', {
  ...sharedLambdaProps,
  functionName: 'cartServiceLambda',
  entry: 'dist/src/main.js',
  handler: 'handler',
});

const api = new apiGateway.HttpApi(stack, 'CartServiceApi', {
  corsPreflight: {
    allowHeaders: ['*'],
    allowOrigins: ['*'],
    allowMethods: [apiGateway.CorsHttpMethod.ANY],
  },
});

const lambdaIntegration = new HttpLambdaIntegration('CartServiceApiIntegration', cartApiLambda)

api.addRoutes({
  integration: lambdaIntegration,
  path: '/{proxy+}',
  methods: [apiGateway.HttpMethod.ANY],
});

