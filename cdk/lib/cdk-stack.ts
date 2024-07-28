import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const distPath = path.resolve(__dirname, '../../dist/src');

    const cartApiServiceLambda = new NodejsFunction(this, 'CartApiServiceLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset(distPath),
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: {
        PG_HOST: 'db-task-8.cfcgm4ywu0u8.eu-central-1.rds.amazonaws.com',
        PG_PORT: '5432',
        PG_USER: 'ihartsykala',
        PG_PASSWORD: 'aBoE4QXMo3ja5sq63j08',
        PG_DATABASE: 'postgres'
      },
    });

    const api = new apigateway.LambdaRestApi(this, 'CartApiServiceApi', {
      handler: cartApiServiceLambda,
      proxy: false
    });

    const profile = api.root.addResource('api').addResource('profile');
    const carts = profile.addResource('carts');
    carts.addMethod('GET');

    const cart = profile.addResource('cart').addResource('{user_id}');
    cart.addMethod('GET');
    cart.addMethod('PUT');
    cart.addMethod('DELETE');
    const checkout = cart.addResource('checkout');
    checkout.addMethod('POST');
  }
}
