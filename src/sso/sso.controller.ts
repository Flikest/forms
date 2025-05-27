import { Body, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
import { SsoService } from "./sso.service";
import { Response } from "express";
import { UUID } from "crypto";
import { PinoLogger } from "nestjs-pino";
import { UserDto } from "src/dto/sso.dto";
import { ApiBody } from "@nestjs/swagger";


@Controller("sso")
export class SsoController{
    constructor(
        private readonly SsoService: SsoService,
        private readonly logger: PinoLogger
    ){
        logger.setContext(SsoController.name)
    }
    @ApiBody({type: [UserDto]})
    @Post("logup")
    async LogUp(@Body() body: UserDto, @Res() res: Response){
        try {
            const user = await this.SsoService.CreateUser(body)
            this.logger.info("response from sso service: ", user)
            res.status(201).json(user)
        } catch (error) {
            res.status(403).json({error: "failed to create an account"})
        }
    }

    @Get("/:id")
    async GetUser(@Param("id") id: string, @Res() res: Response){
        try {
            res.status(200).json(await this.SsoService.GetUser(id))
        } catch (error) {
            res.status(401).json({error: "user with such id does not exist"})
        }
    }

    @ApiBody({type: [UserDto]})
    @Post("login")
    async LogIn(@Body() body: UserDto, @Res() res: Response){
        try{
            const tokens = await this.SsoService.UserLogIn(body)
            this.logger.info(tokens)
            res.status(200).json(tokens)
        }catch (err){
            res.status(404).json({error: "Incorrect username or password"})
            this.logger.error(`error with user login ${err}`)
        }
    }

    @Delete()
    DeleteUser(@Param() id: UUID, @Res() res: Response){
        try {
            res.status(204).json(this.SsoService.DeleteUser(id))
        } catch (err) {
            res.status(400).json({error: "user with this id does not exist"})
            this.logger.error(`error wuth deleting user: ${err}`)
        }
    }
}