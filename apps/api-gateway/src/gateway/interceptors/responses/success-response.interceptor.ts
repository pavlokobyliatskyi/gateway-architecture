import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { SuccessResponse } from '@gateway-architecture/contracts';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<SuccessResponse> {
    return next.handle().pipe(
      map((response) => ({
        status: 'success',
        data: response,
        time: new Date(),
      }))
    );
  }
}
