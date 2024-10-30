import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar', nullable: false })
    full_name: string;

    @Column({ type: 'boolean', default: false })
    is_verified_email: boolean;

    @Column({ type: 'boolean', default: false })
    is_verified_phone: boolean;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar' })
    avatar: string;

    @Column({ type: 'bigint', default: 0 })
    balance: bigint;

    @Column({ type: 'integer', default: 0 })
    score: number;

    @Column({ type: 'varchar' })
    reset_pwd_token: string;

    @Column({ type: 'timestamptz' })
    reset_pwd_expire: string;
}