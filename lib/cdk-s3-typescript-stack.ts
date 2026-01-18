// lib/s3-stack.ts
import { Stack, StackProps, aws_s3 as s3, aws_iam as iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { loadGlobalConfig } from './global';

interface S3StackProps extends StackProps {
  environment: string;
}

export class S3Stack extends Stack {
  constructor(scope: Construct, id: string, props: S3StackProps) {
    super(scope, id, props);

    const global = loadGlobalConfig(this);

    const bucket = new s3.Bucket(this, 'AppBucket', {
      bucketName: `${global.bucketName}-${props.environment}`,
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS_ONLY,
    });

    // Add a bucket policy for public read-only access
    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'], // Allow read-only access to objects
        resources: [`${bucket.bucketArn}/*`], // Apply to all objects in the bucket
        principals: [new iam.AnyPrincipal()], // Allow access to any principal (public)
        effect: iam.Effect.ALLOW,
      })
    );
  }
}