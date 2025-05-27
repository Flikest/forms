import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { FormFieldsDto } from 'src/dto/formFields.dto';
import { FormFieldsEntity } from 'src/entity/forms.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FormFieldsService {
    constructor(
        @InjectRepository(FormFieldsEntity)
        private readonly formFieldsRepository: Repository<FormFieldsEntity>,
        private readonly logger: PinoLogger,
    ){
        logger.setContext(FormFieldsService.name);
    };

    async CreateField(body: FormFieldsDto): Promise<Object>{
        try{
            return await this.formFieldsRepository.save(body);
        }catch(error){
            this.logger.error("error with creating form field: ", error);
            return {error: error}
        };
    };

    async UpdateField(id: string, body: FormFieldsDto): Promise<Object>{
        try{
            const fields = await this.formFieldsRepository.update(id, body);
            this.logger.debug(fields)
            if (fields.affected != 1){
                return {message: "the form is not updated"}
            }
            return {message: "form updated"}
        }catch(error){
            this.logger.error("error with updating field: ", error);
            return {error: error.message}
        };
    };

    async DeleteField(id: string): Promise<Object>{
        try{
            const field = await this.formFieldsRepository.delete(id);
            if (field.affected != 1){
                return{message: "the field was not updated"}
            }
            return{message: "field successfully remote"}
        }catch(error){
            this.logger.error("error with deleting form field: ", error);
            return {error: error};
        }
    };
};
