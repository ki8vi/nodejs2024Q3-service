import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Logger } from './customLogger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, query } = req;

    const now = Date.now();
    this.logger.log(
      `REQUEST: ${method} ${url} - BODY: ${JSON.stringify(
        body,
      )} - QUERY: ${JSON.stringify(query)}`,
    );

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;
        this.logger.log(
          `RESPONSE: ${statusCode} ${method} ${url} - ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
