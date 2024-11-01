import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
export type ListingTypes = "Bán" | "Cho thuê"
export type PropertyTypes = "Căn hộ chung cư" | "Nhà mặt phố" | "Nhà riêng" | "Nhà phố thương mại" | "Biệt thự" | "Đất nền" | "Bán đất" | "Trang trại" | "Khu nghỉ dưỡng" | "Kho" | "Nhà xưởng" | "Khác"
export type DirectionTypes = "Bắc" | "Đông - Bắc" | "Đông" | "Đông - Nam" | "Nam" | "Tây - Nam" | "Tây" | "Tây - Bắc"
export type PostStatusTypes = "Đang đàm phán" | "Còn trống" | "Đã bàn giao"
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    idPost: string;

    @Column({ type: 'varchar', nullable: false })
    title: string;

    @Column({ type: 'varchar', nullable: false })
    address: string;

    @Column({ type: 'varchar', nullable: false })
    province: string;

    @Column({ type: 'varchar' })
    district: string;

    @Column({ type: 'varchar' })
    ward: string;

    @Column({ type: 'float', default: 0 })
    avgStar: number;

    @Column({ type: 'bigint', default: 0 })
    price: bigint;

    @Column({ type: 'bigint', default: 0 })
    priceUnit: bigint;

    @Column({ type: 'integer', default: 0 })
    size: number;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'integer', default: 0 })
    floors: number;

    @Column({ type: 'integer', default: 0 })
    bedrooms: number;

    @Column({ type: 'integer', default: 0 })
    bathrooms: number;

    @Column({ type: 'boolean', default: false })
    isFurniture: boolean;

    @Column({ type: 'boolean', default: false })
    isVerified: boolean;

    @Column({ type: 'timestamptz', nullable: false })
    expiredDate: string;

    @Column({ type: 'timestamptz' })
    expiredBoost: string;

    @Column({
        type: "enum",
        enum: ["Bán", "Cho thuê"],
        default: "Bán",
    })
    listingType: ListingTypes;

    @Column({
        type: "enum",
        enum: ["Căn hộ chung cư", "Nhà mặt phố", "Nhà riêng", "Nhà phố thương mại", "Biệt thự", "Đất nền", "Bán đất", "Trang trại", "Khu nghỉ dưỡng", "Kho", "Nhà xưởng", "Khác"],
        default: "Căn hộ chung cư",
    })
    propertyType: PropertyTypes;

    @Column({
        type: "enum",
        enum: ["Bắc", "Đông - Bắc", "Đông", "Đông - Nam", "Nam", "Tây - Nam", "Tây", "Tây - Bắc"],
        default: "Bắc",
    })
    directionType: DirectionTypes;

    @Column({
        type: "enum",
        enum: ["Bắc", "Đông - Bắc", "Đông", "Đông - Nam", "Nam", "Tây - Nam", "Tây", "Tây - Bắc"],
        default: "Bắc",
    })
    balconyDirectionType: DirectionTypes;

    @Column({
        type: "enum",
        enum: ["Đang đàm phán", "Còn trống", "Đã bàn giao"],
        default: "Đang đàm phán",
    })
    status: PostStatusTypes;

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    user: User

}
