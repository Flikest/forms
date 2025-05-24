import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { AnswersEntity } from 'src/entity/answer.entity';
import { Repository } from 'typeorm';

export type answerRequest = {
    defendant_id: string
    field_id: string
    answer: string | boolean
}

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(AnswersEntity)
        private readonly answerRepository: Repository<AnswersEntity>,
        private readonly logger: PinoLogger,
    ){
        logger.setContext(AnswerService.name)
    }

    async SendAnswer(form_id: string, body: answerRequest[]){
        try {
            const answer = body.map(item => ({
                form_id,
                ...item,
            }))
            return await this.answerRepository.insert(answer)
        } catch (error) {
            this.logger.error("error with sanding answer: ", error)
        }
    }

    async GetAnswers(form_id: string): Promise<AnswersEntity[]> {
        try{
            return await this.answerRepository.find({
                where: {
                    form_id: form_id,
                }
            });
        }catch(error){
            this.logger.error("error with getting answers: ", error);
        };
    };


}
