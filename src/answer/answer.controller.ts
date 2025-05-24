import {
    Body, 
    Controller, 
    Get,
    Param, 
    Post 
} from '@nestjs/common';
import { answerRequest, AnswerService } from './answer.service';
import { PinoLogger } from 'nestjs-pino';

@Controller('answer')
export class AnswerController {
    constructor(
        private readonly answerService: AnswerService,
        private readonly logger: PinoLogger,
    ){
        logger.setContext(AnswerController.name);
    };

    @Post("/:form_id")
    async SendAnswer(@Param("form_id") from_id: string, @Body() body: answerRequest[]){
        try{
            const answer = await this.answerService.SendAnswer(from_id, body);
            this.logger.debug(answer);

            return answer;
        }catch(error){
            this.logger.error("failed to send answer: ", error);
            return "failed to send answer";
        };
    };

    @Get("/:form_id")
    async GetAnswer(@Param("form_id") form_id: string){
        try{
            const answers = await this.answerService.GetAnswers(form_id);
            this.logger.debug(answers);

            return answers;
        }catch(error){
            this.logger.error("Unable to get responses to form: ", error);
            return "Unable to get responses to form";
        };
    };
};
