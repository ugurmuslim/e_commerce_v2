import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as brcypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUseDto(createUserDto);
    return this.userRepository.create({
      ...createUserDto,
      password: await brcypt.hash(createUserDto.password, 10),
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    console.log(email, password, user);

    if (!user || !(await brcypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  getUser(getUserDto: GetUserDto) {
    return this.userRepository.findOne(getUserDto);
  }

  private async validateCreateUseDto(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        email: createUserDto.email,
      });
      if (!user) {
        return;
      }
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException(
      'User with this email already exists',
    );
  }
}
