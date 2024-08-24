import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

import { RpcException } from '@nestjs/microservices';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
