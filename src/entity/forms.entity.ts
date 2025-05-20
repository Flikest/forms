import { UUID } from "crypto";
import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UsingJoinColumnIsNotAllowedError } from "typeorm";
import { User } from "./user.entity";


export enum formTypes{
    text = "text",
    checkBox = "check box",
    radio = "radio button",
};


@Entity()
export class Forms{
    @PrimaryGeneratedColumn()
    @ManyToOne(() => User, user => user.id)
    @OneToMany(() => FormFields, formFields => formFields.id)
    @Index()
    id: UUID

    @Column({ nullable: false })
    creator_id: UUID

    @Column({ nullable: false })
    @Index()
    title: string

    @Column({ nullable: false })
    description: string
};

@Entity()
export class FormFields{
    @PrimaryGeneratedColumn()
    @ManyToOne(() => Forms, forms => forms.id)
    @OneToMany(() => FieldOptions, fieldOptions => fieldOptions.field_id)
    @Index()
    id: UUID

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false, enum: formTypes})
    fieldType: formTypes

    @Column({nullable: false , default: false})
    is_required: boolean = false
}

@Entity()
export class FieldOptions{
    @Column({ nullable: false })
    @ManyToOne(() => FormFields, formsFields => formsFields.id)
    @Index()
    field_id: UUID

    @Column({ nullable: false })
    value: string
}


@Entity()
export class Answers{
    @Column()
    @Index()
    field_id: UUID

    @Column()
    answer: string
}