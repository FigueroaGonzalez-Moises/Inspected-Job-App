import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    first_name: string;

    @Field()
    @Column()
    last_name: string;

    @Field()
    @Column()
    password: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    age?: string;

    @Field()
    @Column()
    phone_number: string;

    @Column("int", { default: 0 })
    tokenVersion: number;
}
