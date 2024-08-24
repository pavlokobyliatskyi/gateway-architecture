import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { ErrorResponse } from '@gateway-architecture/contracts';
import { Response } from 'express';

@Catch()
export class CatchEverythingExceptions implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    response.status(status).json({
      status: 'error',
      message: exception?.message || 'Unknown error, try again.',
      time: new Date(),
    } as ErrorResponse);
  }
}
