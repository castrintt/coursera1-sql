import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG_DB } from 'src/infrastructure/db/config.db';
import { CategoryContainerModule } from 'src/IoC/containers/category.container';
import { JobsContainerModule } from 'src/IoC/containers/job.container';
import { UserContainerModule } from 'src/IoC/containers/user.container';


@Module({
    imports: [
        CqrsModule.forRoot(),
        TypeOrmModule.forRoot(CONFIG_DB),
        UserContainerModule,
        JobsContainerModule,
        CategoryContainerModule
    ],
})
export class AppModule { }
