import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Vpc } from 'aws-cdk-lib/aws-ec2';

import { Construct } from 'constructs';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = Vpc.fromLookup(this, 'VPC', {
      vpcId: process.env.VPS_ID!,
    });

    const policyStatement = new PolicyStatement({
          actions: ['rds-db:connect', 'rds-db:executeStatement'],
          resources: ['*'],
        })

    const wrapperAppLambda = new Function(this, 'WrapperAppLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'main.handler',
      code: Code.fromAsset('../dist'),
      vpc,
      allowPublicSubnet: true,
      environment: {
        PG_HOST: process.env.PG_HOST!,
        PG_PORT: process.env.PG_PORT!,
        PG_USER: process.env.PG_USER!,
        PG_PASSWORD: process.env.PG_PASSWORD!,
        PG_DATABASE: process.env.PG_DATABASE!
      },
      timeout: cdk.Duration.seconds(10),
      initialPolicy: [
        policyStatement
      ],
    });

    const lambdaIntegration = new LambdaIntegration(wrapperAppLambda)

    const restApi = new RestApi(this, 'WrapperAppLambdaApi', {
      restApiName: 'REST API',
    });

    const apiResource = restApi.root.addResource('{proxy+}');

    apiResource.addMethod('ANY', lambdaIntegration);
  }
}
