import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { AnswerDto } from 'src/dto/answer.dto';
import { AnswersEntity } from 'src/entity/answer.entity';
import { InsertResult, Repository } from 'typeorm';


@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(AnswersEntity)
        private readonly answerRepository: Repository<AnswersEntity>,
        private readonly logger: PinoLogger,
    ){
        logger.setContext(AnswerService.name)
    }

    async SendAnswer(form_id: string, body: AnswerDto[]): Promise<InsertResult>{
        try {
            const answer = body.map(item => ({
                form_id,
                ...item,
            }))
            return await this.answerRepository.insert(answer)
        } catch (error) {
            this.logger.error("error with sanding answer: ", error.message)
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
