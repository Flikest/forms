import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn("uuid")
    @Index()
    id: string

    @Column({unique: true})
    @Index()
    login: string

    @Column()
    password: string
}