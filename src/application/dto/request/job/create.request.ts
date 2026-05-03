export class CreateJobRequest {
  constructor(
    public readonly enterpriseName: string,
    public readonly jobTitle: string,
    public readonly candidatedAt: Date,
    public readonly jobLink: string,
    public readonly observation: string,
    public readonly categoryId: string,
  ) {}
}
