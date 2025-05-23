import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { FormFieldsService } from './form-fields.service';
import { FormFieldsEntity } from 'src/entity/forms.entity';

@Controller('form-fields')
export class FormFieldsController {
    constructor(
        private readonly formFieldsService: FormFieldsService
    ){}

    @Post()
    async CreateField(@Body() body: FormFieldsEntity){
        try{
            return await this.formFieldsService.CreateField(body);
        }catch(error){
            return "invalid data"
        }
    }

    @Put("/:id")
    async UpdateField(@Param("id") id: string, @Body() body: FormFieldsEntity){
        try {
            return await this.formFieldsService.UpdateField(id, body)
        } catch (error) {
                return "invalid data"
        }
    }

    @Delete("/:id")
    async DeleteField(@Param("id") id: string, body: FormFieldsEntity){
        try {
            return await this.formFieldsService.DeleteField(id)
        } catch (error) {
            return "invalid data"
        }
    }
}
