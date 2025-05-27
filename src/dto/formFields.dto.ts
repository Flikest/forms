import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { FieldTypes } from "src/entity/forms.entity";

export class FormFieldsDto{
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty({ enum: ['text', 'check box', 'radio button']})
    @IsNotEmpty()
    fieldType: FieldTypes

    @ApiProperty()
    is_required: boolean
    
    @ApiProperty()
    @IsNotEmpty()
    value: string

    @ApiProperty()
    @IsNotEmpty()
    field_id: string
}