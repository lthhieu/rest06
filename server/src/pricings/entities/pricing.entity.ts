import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export enum PricingNames {
    NORMAL = "Thường",
    BRONZE = "Đồng",
    SILVER = "Bạc",
    GOLD = "Vàng",
    DIAMOND = "Kim cương"
}
@Entity()
export class Pricing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: PricingNames,
        default: PricingNames.NORMAL,
    })
    name: PricingNames;

    @Column({ type: 'boolean', default: false })
    isShowImmediately: boolean;

    @Column({ type: 'boolean', default: false })
    isShowDescription: boolean;

    @Column({ type: 'integer', default: 0 })
    priority: number;

    @Column({ type: 'integer', default: 0 })
    requiredScore: number;

    @Column({ type: 'integer', default: 0 })
    requiredScoreNextLevel: number;

    @Column({ type: 'bigint', default: 0 })
    price: bigint;

    @Column({ type: 'integer', default: 0 })
    expiredDay: number;

    @Column({ type: 'varchar' })
    imgUrl: string;
}
