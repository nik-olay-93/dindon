import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export interface UserInput {
  username: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ username });
    return user;
  }

  async createUser(input: UserInput): Promise<string> {
    const user = this.userRepository.create(input);
    try {
      await this.userRepository.save(user);
      return user.id;
    } catch (e) {
      if (e.code == '23505') {
        return '23505';
      }

      console.log(e);
      return '-1';
    }
  }
}
