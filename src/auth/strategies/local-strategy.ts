import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

// localStrategy to strategia, która będzie używana do weryfikacji credentials użytkownika.
// ''local'' is the name of the strategy - być może ten string ''local'' jest zbędny
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    // constructor is not needed in this case
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, password: string): Promise<any> {
    return await this.authService.validateUser(email, password);
  }
}
