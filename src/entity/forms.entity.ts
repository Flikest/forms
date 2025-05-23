import { 
    Column,
    Entity,
    Index, 
    JoinColumn,  
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn,  
} from "typeorm";

export enum formTypes{
    text = "text",
    checkBox = "check box",
    radio = "radio button",
};


@Entity({name: "forms"})
export class FormsEntity{
    @PrimaryGeneratedColumn("uuid")
    @Index()
    id: string
    
    @Column({ nullable: false })
    creator_id: string
    
    @Column({ nullable: false })
    @Index()
    title: string
    
    @Column({ nullable: false })
    description: string

    @OneToMany(() => FormFieldsEntity, formFieldsEntity => formFieldsEntity.form)
    formfields: FormFieldsEntity[]
};

@Entity({name: "form_fields"})
export class FormFieldsEntity{
    @PrimaryGeneratedColumn({name: "uuid",})
    @Index()
    id: string

    @ManyToOne(() => FormsEntity, (form) => form.formfields)
    @JoinColumn({ name: "form_id" })
    form: FormsEntity;


    @Column({ nullable: false })
    name: string

    @Column({ nullable: false, enum: formTypes})
    fieldType: formTypes

    @Column({nullable: false , default: false})
    is_required: boolean = false
    
    @Column({ nullable: false, type: "uuid" })
    @Index()
    field_id: string
    
    @Column({ nullable: false })
    value: string

}

@Entity("answers")
export class AnswersEntity{
    @PrimaryGeneratedColumn("uuid")
    @Index()
    id: string

    @ManyToOne(() => FormFieldsEntity, (field) => field.answers)
    @JoinColumn({ name: "field_id" })
    field: FormFieldsEntity;

    @Column({type: "uuid", nullable: false})
    defendant_id: string

    @Column({type: "uuid"})
    fields_id: string

    @Column()
    answer: string
}