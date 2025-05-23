import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
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

    async CreateField(body: FormFieldsEntity): Promise<InsertResult>{
        try{
            return await this.formFieldsRepository.insert(body);
        }catch(error){
            this.logger.error("error with creating form field: ", error);
        };
    };

    async UpdateField(id: string, body: FormFieldsEntity): Promise<UpdateResult>{
        try{
            return await this.formFieldsRepository.update(id, body);
        }catch(error){
            this.logger.error("error with updating field: ", error);
        };
    };

    async DeleteField(id: string): Promise<DeleteResult>{
        try{
            return await this.formFieldsRepository.delete(id);
        }catch(error){
            this.logger.error("error with deleting form field: ", error);
        };
    };
}
