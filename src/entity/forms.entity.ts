import { 
    Column,
    Entity,
    Index, 
    JoinColumn,  
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn,  
} from "typeorm";

export enum FieldTypes{
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
    @PrimaryGeneratedColumn("uuid")
    @Index()
    id: string

    @ManyToOne(() => FormsEntity, (form) => form.formfields)
    @JoinColumn({ name: "form_id" })
    form: FormsEntity;

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false, enum: FieldTypes, type: "enum"})
    fieldType: FieldTypes

    @Column({nullable: false , default: false})
    is_required: boolean = false
    
    
    @Column({ nullable: false })
    value: string
}