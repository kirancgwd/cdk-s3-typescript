/// lib/global.ts
import { aws_ssm as ssm, Tags, Stack } from 'aws-cdk-lib';

export interface GlobalConfig {
  projectCode: string;
  bucketName: string;
}

export function loadGlobalConfig(stack: Stack): GlobalConfig {
  const projectCode = ssm.StringParameter.valueForStringParameter(
    stack,
    '/global/project-code'
  );

  const bucketName = ssm.StringParameter.valueForStringParameter(
    stack,
    '/global/s3/bucket-name'
  );

  // Global tags
  Tags.of(stack).add('project-code', projectCode);
  Tags.of(stack).add('managed-by', 'cdk');

  return {
    projectCode,
    bucketName,
  };
}
