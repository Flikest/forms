import { UUID } from "crypto";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn("uuid")
    @Index()
    id: UUID

    @Column()
    @Index()
    logIn: string

    @Column()
    password: string
}