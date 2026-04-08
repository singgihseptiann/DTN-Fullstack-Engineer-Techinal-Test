import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const skip = this.reflector.getAllAndOverride<boolean>('skipResponse', [
      context.getHandler(),
      context.getClass(),
    ]);

    // ✅ skip wrapping kalau ada decorator
    if (skip) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        if (data?.message && data?.data !== undefined) {
          return {
            success: true,
            message: data.message,
            data: data.data,
          };
        }

        return {
          success: true,
          message: 'Request successful',
          data,
        };
      }),
    );
  }
}
