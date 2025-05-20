import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";


@Inject()
export class FormsService{
    consttructor(
        @InjectRepository()
        private
    ){}
}