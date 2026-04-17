import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG_DB } from 'src/infrastructure/db/config.db';
import { AuthModule } from 'src/modules/containers/auth.module';
import { CategoryContainerModule } from 'src/modules/containers/category.container';
import { JobsContainerModule } from 'src/modules/containers/job.container';
import { UserContainerModule } from 'src/modules/containers/user.container';
import { JwtAuthGuard } from './guard/jwtAuth.guard';

@Module({
    imports: [
        CqrsModule.forRoot(),
        TypeOrmModule.forRoot(CONFIG_DB),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 3,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 20
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 100
                }
            ],
        }),
        UserContainerModule,
        JobsContainerModule,
        CategoryContainerModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        }
    ],
})
export class AppModule { }
