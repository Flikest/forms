import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Entity("answers")
export class AnswersEntity{
    @PrimaryGeneratedColumn("uuid")
    @Index()
    id: string

    @Column({type: "uuid", nullable: false})
    form_id: string

    @Column({type: "uuid", nullable: false})
    defendant_id: string

    @Column({type: "uuid"})
    fields_id: string

    @Column()
    answer: string
}