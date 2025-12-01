import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();

    const request = ctx.req || context.switchToHttp().getRequest();
    const response = ctx.res || context.switchToHttp().getResponse();

    return { req: request, res: response };
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    return (
      (req.ips?.length ? req.ips[0] : req.ip) ||
      req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.connection?.remoteAddress ||
      'unknown'
    );
  }
}
