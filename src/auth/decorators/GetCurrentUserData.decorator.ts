import {
  createParamDecorator,
  InternalServerErrorException,
  ExecutionContext,
} from '@nestjs/common';
import { User } from '@prisma/client';

// powinien request.user odpowiadać req z auth guard, czyli data musi mieć interface
// odpowiedni do tego co jest w req.user zwracany przez auth guard
// Passportjs zaprojektowane tak, aby po pomyślnej weryfikacji danych uwierzytelniających
// (np. po pomyślnym uruchomieniu validate w JwtStrategy),na obiekcie request ustawić
// właściwość user

export const GetCurrentUserData = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    if (!data) {
      throw new InternalServerErrorException('Data is required');
    }
    // const request: ExecutionContext = ctx.switchToHttp().getRequest();
    const request = ctx.switchToHttp().getRequest<{ user?: User }>().user;

    if (!request) {
      throw new InternalServerErrorException(
        'User object not found on request. Check if authentication guard is applied.',
      );
    }

    if (!(data in request)) {
      throw new InternalServerErrorException(
        `Property "${String(data)}" not found in user object.`,
      );
    }

    return request[data];
  },
);
