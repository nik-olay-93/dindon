import { UserInputResponse } from '../user.controller';

export function ValidateUserInput(
  username: any,
  password: any,
): UserInputResponse | undefined {
  if (typeof username !== 'string') {
    return new UserInputResponse('username', 'Incorrect value');
  }

  if (typeof password !== 'string') {
    return new UserInputResponse('password', 'Incorrect value');
  }

  if (username.length < 3) {
    return new UserInputResponse('username', 'Length must be greater than 2');
  }

  if (password.length < 3) {
    return new UserInputResponse('password', 'Length must be greater than 2');
  }
}
