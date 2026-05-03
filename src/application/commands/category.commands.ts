export class CreateCategoryCommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly order: number | undefined,
  ) {}
}

export class UpdateCategoryCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly order: number | undefined,
  ) {}
}

export class DeleteCategoryCommand {
  constructor(public readonly id: string) {}
}
