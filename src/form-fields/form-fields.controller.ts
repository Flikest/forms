import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { FormFieldsService } from './form-fields.service';
import { FormFieldsDto } from 'src/dto/formFields.dto';
import { Logger, PinoLogger } from 'nestjs-pino';
import { ApiBody } from '@nestjs/swagger';

@Controller('form-field')
export class FormFieldsController {
    constructor(
        private readonly formFieldsService: FormFieldsService,
        private readonly logger: PinoLogger
    ){
        logger.setContext(FormFieldsController.name)
    }

    @ApiBody({type: [FormFieldsDto]})
    @Post()
    async CreateField(@Body() body: FormFieldsDto){
        try{
            return await this.formFieldsService.CreateField(body);
        }catch(error){
            this.logger.error(`error with creating user: ${error}`)
            return {error: "invalid data"}
        }
    }

    @ApiBody({type: [FormFieldsDto]})
    @Put("/:id")
    async UpdateField(@Param("id") id: string, @Body() body: FormFieldsDto){
        try {
            return await this.formFieldsService.UpdateField(id, body)
        } catch (error) {
            this.logger.error(`error with updating user: ${error}`)
            return {error: error.message}
        }
    }

    @Delete("/:id")
    async DeleteField(@Param("id") id: string){
        try {
            return await this.formFieldsService.DeleteField(id)
        } catch (error) {
            this.logger.error(`error with deleting user: ${error}`)
            return {error: error.message}
        }
    }
}
