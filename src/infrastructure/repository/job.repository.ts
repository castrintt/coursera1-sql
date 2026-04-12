
import { Inject, Injectable } from '@nestjs/common';
import { JobEntity } from 'src/domain/entities/job.entity';
import { IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { JobRepositorySymbol } from 'src/IoC/symbols/job.symbols';
import { Repository } from 'typeorm';

@Injectable()
export class JobRepository implements IJobRepository {

    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: Repository<JobEntity>,
    ) { }
}
