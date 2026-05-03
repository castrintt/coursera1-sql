export class GetJobByIdQuery {
  constructor(public readonly id: string) {}
}

export class FindAllJobsQuery {
  constructor(public readonly categoryId: string) {}
}
