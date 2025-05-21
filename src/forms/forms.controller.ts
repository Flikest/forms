import { PinoLogger } from "nestjs-pino";
import { formRequest, FormsService } from "./forms.service";
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { UUID } from "crypto";


@Controller("form")
export class FormsController{
    constructor(
        private readonly formsService: FormsService,
        private readonly logger: PinoLogger
    ){
        logger.setContext(FormsController.name)
    }


    @Post()
    async CreateForm(@Body() body: formRequest){
        try{
            return this.formsService.CreateForm(body)
        }catch{
            return "incorrect data"
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

    @Put("/:id")
    async UpdateForm(
        @Param("id") id: UUID,
        @Body() body: formRequest
    ){

        try{
            return await this.formsService.UpdateForm(id, body)
        }catch{
            return "incorrect data"
        }
    }

    @Delete("/:id")
    async DeleteForm(@Param("id") id: UUID){
        try{
            return await this.formsService.DeleteForm(id)
        }catch{
            return "incorrect data"
        }
        return await this.formsService.DeleteForm(id)
    }

}