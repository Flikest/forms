import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { InsertResult, Repository } from "typeorm";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { randomUUID,  UUID } from "crypto";
import { sign } from "jsonwebtoken"

@Injectable()
export class SsoService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){};

    async CreateUser(body: User): Promise<InsertResult>{
        const hash = genSaltSync(12);
        body.password = hashSync(body.password, hash);

        return await this.userRepository.insert(body);
    };

    async GetUser(id: UUID): Promise<User>{
        return await this.userRepository.findOneBy({id: id})
    };

    async UserLogIn(body: User): Promise<Map<string, string>> {
        const user:User = await this.userRepository.findOneBy(
            {
                logIn: body.logIn
            }
        );

        const verify: boolean = await compareSync(body.password, user.password)
        
        switch(verify){
            case true:
                const refreshToken: string = await sign(
                    {id: user.id},
                    process.env.REFRESH_SECRET,
                    {expiresIn: '168h'}, 
                ); 

                const accessToken: string = await sign(
                    {id: user.id},
                    process.env.ACCESS_SECRET,
                    {expiresIn: '30min'},
                );

                return new Map([["refreshToken", refreshToken], ["accessToken", accessToken]]); 

            case false:
                return null;
        };
    };

    async UpdateUser(body: User){
        const user: User = await this.userRepository.findOneBy({logIn: body.logIn});

        const isNewPass: boolean = await compareSync(body.password, user.password);

        if (isNewPass === true){
            const hash = genSaltSync(12);
            body.password = hashSync(body.password, hash);
        };

        return await this.userRepository.save(body)
    };

    async DeleteUser(id: UUID){
        return await this.userRepository.delete({id: id});
    };
}