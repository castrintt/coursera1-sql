import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobRepository, JobRepositorySymbol } from "src/infrastructure/repository/job.repository";
import { Repository } from "typeorm";
import { CreateJobCommand } from "../../job.commands";

@CommandHandler(CreateJobCommand)
export class CreateJobHandler implements ICommandHandler<CreateJobCommand> {
    constructor(
        @Inject(JobRepositorySymbol)
        private readonly _job_repository: Repository<JobRepository>,
    ) { }

    async execute(command: CreateJobCommand): Promise<boolean> {
        await this._job_repository.save(this.mapCommandToRepository(command));
        return true;
    }

    private mapCommandToRepository(command: CreateJobCommand): JobRepository {
        const job = this.mapCommandToRepository(command)
        job.jobTitle = command.enterpriseName;
        job.jobTitle = command.jobTitle;
        job.candidatedAt = command.candidatedAt;
        job.jobLink = command.jobLink;
        job.observation = command.observation;
        job.category = command.categoryId;
        return job;
    }

}   