import { Post } from 'src/posts/entities/post.entity';
import { Pricing } from 'src/pricings/entities/pricing.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';

export enum TypeNames {
    SYSTEM = "system",
    GOOGLE = "google"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar', nullable: false })
    fullName: string;

    @Column({ type: 'boolean', default: false })
    isVerifiedEmail: boolean;

    @Column({ type: 'boolean', default: false })
    isVerifiedPhone: boolean;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar' })
    avatar: string;

    @Column({
        type: "enum",
        enum: TypeNames,
        default: TypeNames.SYSTEM,
    })
    type: TypeNames;

    @Column({ type: 'bigint', default: 0 })
    balance: bigint;

    @Column({ type: 'integer', default: 0 })
    score: number;

    @Column({ type: 'varchar' })
    resetPwdToken: string;

    @Column({ type: 'timestamptz' })
    resetPwdExpire: string;

    @ManyToOne(() => Pricing, (pricing) => pricing.id, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    pricing: Pricing

    @ManyToMany(() => Post, (post) => post.users)
    posts: Post[]

}