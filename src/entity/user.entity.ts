import { UUID } from "crypto";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Forms } from "./forms.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    @OneToMany(() => Forms, forms => forms.id )
    @Index()
    id: UUID

    @Column()
    @Index()
    logIn: string

    @Column()
    password: string
}