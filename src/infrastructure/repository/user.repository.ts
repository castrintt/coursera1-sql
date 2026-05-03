import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetByIdResponse } from 'src/application/dto/response/user/getById.response';
import { UserMapper } from 'src/application/mapper/user.mapper';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { ApiErrorMessages } from 'src/shared/constants/api-error-messages';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _user_repository: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<{ id: string }> {
    return await this._user_repository
      .save(user)
      .then((user) => ({ id: user.id }));
  }

  async findById(id: string): Promise<GetByIdResponse> {
    const user = await this._user_repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(ApiErrorMessages.user.notFoundForId(id));
    }
    return UserMapper.fromDomainToResponse(user);
  }

  async findByEmail(email: string): Promise<GetByIdResponse> {
    const user = await this._user_repository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(ApiErrorMessages.user.notFoundForEmail);
    }
    return UserMapper.fromDomainToResponse(user);
  }

  async findUserEntityByEmail(email: string): Promise<UserEntity | null> {
    return this._user_repository.findOne({ where: { email } });
  }

  async update(user: UserEntity): Promise<boolean> {
    return await this._user_repository
      .update(user.id, user)
      .then((result) => (result.affected ?? 0) > 0);
  }

  async delete(id: string): Promise<boolean> {
    return await this._user_repository
      .delete(id)
      .then((result) => (result.affected ?? 0) > 0);
  }
}
