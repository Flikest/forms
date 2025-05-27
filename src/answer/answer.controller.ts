import {
    Body, 
    Controller, 
    Get,
    Param, 
    Post 
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { PinoLogger } from 'nestjs-pino';
import { AnswerDto } from 'src/dto/answer.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('answer')
export class AnswerController {
    constructor(
        private readonly answerService: AnswerService,
        private readonly logger: PinoLogger,
    ){
        logger.setContext(AnswerController.name);
    };

    @ApiBody({type: [AnswerDto]})
    @Post("/:form_id")
    async SendAnswer(@Param("form_id") from_id: string, @Body() body: AnswerDto[]){
        try{
            const answer = await this.answerService.SendAnswer(from_id, body);
            this.logger.debug(answer);
            if (answer.raw[0] != ""){
               return {message: "answers sent to the form"};
            }
            return {message: "response not sent to form"}
        }catch(error){
            this.logger.error("failed to send answer: ", error);
            return {error: error.message};
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
            return {error: error.message};
        };
    };
};
