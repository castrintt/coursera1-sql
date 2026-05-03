export class GetJobByIdQuery {
  constructor(
    public readonly id: string,
    public readonly requestingUserId: string,
  ) {}
}

export class FindAllJobsQuery {
  constructor(
    public readonly categoryId: string,
    public readonly requestingUserId: string,
  ) {}
}
