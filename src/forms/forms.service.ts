import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { PinoLogger } from "nestjs-pino";
import { title } from "process";
import { filter } from "rxjs";
import { FormsEntity } from "src/entity/forms.entity";
import { DeleteResult, FindOptionsWhere, InsertResult, Repository, UpdateResult } from "typeorm";

export type formRequest = {
    creator_id: UUID
    title: string
    description: string
};


@Injectable()
export class FormsService{
    constructor(
        @InjectRepository(FormsEntity)
        private readonly formsRepository: Repository<FormsEntity>,
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

    async GetForms(filters: {id?: string, title?: string}){
        try{
            const idReturned: boolean = !!filters.id
            const titleReturned: boolean = !!filters.title

            this.formsRepository.find({
                where: {
                    id: filters.id,
                    title: filters.title
                },
                relations: {
                    formfields: true,
                }
            })

            
            

            
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