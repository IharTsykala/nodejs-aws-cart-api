#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { CdkStack } from '../lib/cdk-stack';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = new cdk.App();
new CdkStack(app, 'CdkStackCartApi', {
    env: {
        account: process.env.AWS_ACCOUNT,
        region: process.env.REGION,
    },
});
