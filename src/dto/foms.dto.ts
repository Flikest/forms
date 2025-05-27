import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class FormsDto{
    @ApiProperty()
    @IsNotEmpty()
    creator_id: string

    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    description: string
}

export class CreateFormDto{
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    description: string
}