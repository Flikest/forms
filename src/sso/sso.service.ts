import { Injectable, ParseUUIDPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken"
import { PinoLogger } from "nestjs-pino";
import { UserDto } from "src/dto/sso.dto";
import { stringify } from "node:querystring";


@Injectable()
export class SsoService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly logger: PinoLogger
    ){
        logger.setContext(SsoService.name)
    };

    async CreateUser(body: UserDto): Promise<Object>{
        try{
            if (!body.login || !body.password){
                return {error: "Please fill in all required fields"}
            }
            const hash = genSaltSync(12);
            body.password = hashSync(body.password, hash);

            const user = await this.userRepository.save(body);

            this.logger.debug(user);

            return user;
        }catch(error){
            this.logger.error(`error with creating user: ${error}`);
        };
    };

    async GetUser(id: string): Promise<Object>{
        try{
            const user = await this.userRepository.findOne({where:{id: id}})
            this.logger.info(`user: ${user.login}`)
            return user
        }catch(error){
            this.logger.error(`error with gettinguser: ${error}`)
            return {error: "user with such id does not exist"}
        }
    };

    async UserLogIn(body: UserDto): Promise<Object> {
        try {
            const user:UserEntity = await this.userRepository.findOneBy(
                {
                    login: body.login
                }
            );
            if (!user){
                return {error: "Invalid login"}
            }
            
            const verify: boolean = await compareSync( body.password, user.password,)
            if (!verify) {
                return { error: 'Invalid password' };
            }
                
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
            
                    return {
                        "access": accessToken,
                        "refresh": refreshToken 
                    }
        
                case Boolean(false): 
                this.logger.info("weqrqewrqwerwerwer")
                return{error: "Invalid password or log in"}
            };
            
        } catch (error) {
            this.logger.error(`error with loggining user: ${error}`)
            return new Error(`error with loggining user: ${error}`)
        }
    };

    async DeleteUser(id: string): Promise<Object>{
        return await this.userRepository.delete({id: id});
    };
}