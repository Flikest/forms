import { Body, Controller, Delete, Param, Patch, Post, Req, Res } from "@nestjs/common";
import { SsoService } from "./sso.service";
import { User } from "src/entity/user.entity";
import { Request, Response } from "express";
import { UUID } from "crypto";


@Controller("sso")
export class SsoController{
    constructor(
        private readonly SsoService: SsoService
    ){}

    @Post("logup")
    LogUp(@Body() body: User){
        return this.SsoService.CreateUser(body)
    }

    @Patch()
    UpdateUser(@Body() body: User, @Res() res: Response){
        try{
            res.status(209)
            res.json(this.SsoService.UpdateUser(body))
        }catch{
            res.status(507)
            res.json("user not updated!")
        }
    }


    @Post("login")
    LogIn(@Body() body: User, @Res() res: Response){
        try{
            res.status(200)
            res.json(this.SsoService.UserLogIn(body))
        }catch (err){
            res.status(400)
            res.json("Incorrect username or password")
            console.error(`error with user login ${err}`)
        }
    }

    @Delete()
    DeleteUser(@Param() id: UUID, @Res() res: Response){
        try {
            res.status(200)
            res.json(this.SsoService.DeleteUser(id))
        } catch (err) {
            res.status(400)
            res.json("user with this id does not exist")
            console.error(`error whith deleting user: ${err}`)
        }
    }
}