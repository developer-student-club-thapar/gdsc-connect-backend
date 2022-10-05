import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ResourceDecorator = (resource: string) => {
  console.log('CALLING SET METADATA RESOURCES', resource);
  return SetMetadata('resource', resource);
};
export const getResourceFromClass = (
  reflector: Reflector,
  executionContext: ExecutionContext,
): string => {
  const resource = reflector.get<string>(
    'resource',
    executionContext.getClass(),
  );
  return resource || '';
};
