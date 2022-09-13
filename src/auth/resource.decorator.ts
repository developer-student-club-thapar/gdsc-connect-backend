import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ResourceDecorator = (resource: string) => {
  console.log('CALLING SET METADATA RESOURCES', resource);
  return SetMetadata('resources', resource);
};

export const getResourcesFromHandler = (
  reflector: Reflector,
  executionContext: ExecutionContext,
): string => {
  const resource = reflector.get<string>(
    'resource',
    executionContext.getHandler(),
  );
  return resource || '';
};
