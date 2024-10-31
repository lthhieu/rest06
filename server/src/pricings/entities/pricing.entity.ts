import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Pricing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    isShowImmediately: string;

    @Column({ type: 'boolean', default: false })
    isShowDescription: boolean;

    @Column({ type: 'integer', default: 0 })
    priority: number;

    @Column({ type: 'integer', default: 0 })
    requiredScore: number;

    @Column({ type: 'integer', default: 0 })
    price: number;

    @Column({ type: 'integer', default: 0 })
    expiredDay: number;
}
