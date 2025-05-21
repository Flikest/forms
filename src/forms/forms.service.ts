import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { PinoLogger } from "nestjs-pino";
import { FormFields, Forms } from "src/entity/forms.entity";
import AppDataSource from "src/typeorm.config";
import { createQueryBuilder, DeleteResult, FindOptionsWhere, InsertResult, QueryBuilder, Repository, UpdateResult } from "typeorm";

export type formRequest = {
    creator_id: UUID
    title: string
    description: string
};


@Injectable()
export class FormsService{
    constructor(
        @InjectRepository(Forms)
        private readonly formsRepository: Repository<Forms>,
        private readonly logger: PinoLogger,
    ){
        this.logger.setContext(FormsService.name);
    };

    async CreateForm(body: formRequest): Promise<InsertResult> {
        try{
            const form = await this.formsRepository.insert(body);
            this.logger.info(form);

            return form;
        }catch(error){
            this.logger.error("error with creating form: ", error);
        };
    };

    async GetForms(filters: {id?: UUID, title?: string}){
        try{
            const aqb = AppDataSource.createQueryBuilder(Forms, "forms", FormFields, "forms_field");

            const whereConditions: FindOptionsWhere<Forms> = {};

            if (filters.id) {
                whereConditions.id = filters.id;
            };

            if (filters.title) {
                whereConditions.title = filters.title;
            };

            

            const results = aqb
                .innerJoinAndSelect("", "")
                .where("");
            this.logger.info(results);

            return results;
        }catch(error){
            this.logger.error("error with getting forms: ", error);
        };
    };

    async UpdateForm(id: UUID, body: formRequest): Promise<UpdateResult>{
        try{
            const result = await this.formsRepository.update(id, body);
            this.logger.info(result);

            return result;
        }catch(error){
            this.logger.error("error with updating form: ", error);
        };
    };

    async DeleteForm(id: UUID): Promise<DeleteResult>{
        try{
            const result = await this.formsRepository.delete(id);
            this.logger.info(result);

            return result;
        }catch(error){
            this.logger.error("error with deleting form: ", error);
        };
    };
}