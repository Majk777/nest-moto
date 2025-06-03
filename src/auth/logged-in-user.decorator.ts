import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const LoggedInUser = createParamDecorator(
  // data - data from the decorator that we are using for the LoggedInUser decorator
  // ctx - context
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: User }>().user;
    console.log('request from context logged in USER', request);
    return request;
  },
);
// IDZIE DO AUTH GUARD W AUTH CONTROLLERZE --->
