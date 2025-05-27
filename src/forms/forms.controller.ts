import { PinoLogger } from "nestjs-pino";
import { FormsService } from "./forms.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { UUID } from "crypto";
import { verify } from "jsonwebtoken"
import { FormsDto } from "src/dto/foms.dto";
import { ApiBody } from "@nestjs/swagger";

@Controller("form")
export class FormsController{
    constructor(
        private readonly formsService: FormsService,
        private readonly logger: PinoLogger
    ){
        logger.setContext(FormsController.name)
    }
    @ApiBody({type: [FormsDto]})
    @Post()
    async CreateForm(@Req() req: Request, @Body() body: FormsDto){
        try{
            const header: string = req.headers["authorization"];
            const token: string = header.split(" ")[1];
            const payload = verify(token, process.env.ACCESS_SECRET);

            body.creator_id = payload.id;

            const form = await this.formsService.CreateForm(body);
            this.logger.info(form)
            return form
        }catch(error){
            this.logger.error(`error with creating forms: ${error}`)
            return {error: error.message}
        }
    }

    @Get()
    async GetForm(
        @Query("id") id: UUID, @Query("title") title: string
    ){
        try{
            return await this.formsService.GetForms({id, title})
        }catch{
            return "incorrect data"
        }
    }

    @Get("myforms")
    async GetMyForms(@Req() req: Request){
        const header: string = req.headers["authorization"];
        const token: string = header.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_SECRET);
        if (!payload){
            return "Invalid access token"
        }

        const forms = await this.formsService.GetMyForms(payload.id)
        
        return forms
    };

    @ApiBody({type: [FormsDto]})
    @Put("/:id")
    async UpdateForm(
        @Param("id") id: UUID,
        @Req() req: Request,
        @Body() body: FormsDto
    ){
        try{
            const header: string = req.headers["authorization"];
            const token: string = header.split(" ")[1];
            const payload = verify(token, process.env.ACCESS_SECRET);

            body.creator_id = payload.id;

            const form = await this.formsService.UpdateForm(id, body)
            if (form.affected === 0){
                return {error: "the form has not been updated"}
            }
            return {message: "form updated successfully"}
        }catch{
            return {error: "incorrect data"}
        }
    }

    @Delete("/:id")
    async DeleteForm(@Param("id") id: UUID){
        try{
            return await this.formsService.DeleteForm(id)
        }catch{
            return "incorrect data"
        }
    }
}