import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class AnswerDto{
    @ApiProperty()
    @IsNotEmpty()
    form_id: string
    
    @ApiProperty()
    @IsNotEmpty()
    defendant_id: string
    
    @ApiProperty()
    @IsNotEmpty()
    fields_id: string
    
    @ApiProperty()
    @IsNotEmpty()
    answer: string
}