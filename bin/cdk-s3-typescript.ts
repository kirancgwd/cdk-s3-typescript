// bin/app.ts
import { App } from 'aws-cdk-lib';
import { S3Stack } from '../lib/cdk-s3-typescript-stack';

const app = new App();

const environment = process.env.DEPLOY_ENV || 'dev';

new S3Stack(app, `s3-stack-${environment}`, {
  environment,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
