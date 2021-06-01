import { Controller, Get, Post, Req } from '@nestjs/common';
import argon2 from 'argon2';
import { Request } from 'express';
import { UserService } from './user.service';
import { ValidateUserInput } from './userUtils/ValidateUserInput';

export class UserInputResponse {
  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }

  field: string;
  message: string;
}

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  async getMe(@Req() request: Request): Promise<string | undefined> {
    if (!request.session.userId) {
      return undefined;
    }
    const user = await this.userService.findOne(request.session.userId);

    return JSON.stringify(user);
  }

  @Post('/register')
  async register(@Req() request: Request): Promise<UserInputResponse> {
    const username = request.body.username;
    const password = request.body.password;

    const err = ValidateUserInput(username, password);
    if (err) {
      return err;
    }

    const hashedPassword = await argon2.hash(password);

    const ans = await this.userService.createUser({
      username,
      password: hashedPassword,
    });
    switch (ans) {
      case '-1':
        return new UserInputResponse('unknown', 'unknown');
      case '23505':
        return new UserInputResponse('username', 'This user already exists');
      default:
        request.session.userId = ans;
        return new UserInputResponse('', '');
    }
  }

  @Post('/login')
  async login(@Req() request: Request): Promise<UserInputResponse> {
    const username = request.body.username;
    const password = request.body.password;

    const err = ValidateUserInput(username, password);
    if (err) {
      return err;
    }

    const user = await this.userService.findByUsername(username);

    if (!user) {
      return new UserInputResponse('username', 'That user doesnt exist');
    }

    const resp = await argon2.verify(user.password, password);

    if (!resp) {
      return new UserInputResponse('password', 'Wrong password');
    }

    request.session.userId = user.id;

    return new UserInputResponse('', '');
  }

  @Post('/logout')
  async logout(@Req() request: Request) {
    request.session.destroy((err) => {
      if (err) console.log(err);
    });
  }
}
