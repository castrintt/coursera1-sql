import { IsInt, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";

export class UpdateCategoryRequest {
    @IsUUID()
    public readonly id: string;

    @IsString()
    @MaxLength(150)
    public readonly name: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    public readonly order?: number;
}
