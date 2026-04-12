
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/IoC/symbols/user.symbols';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserEntity>,
    ) { }

}

