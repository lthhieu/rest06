import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    content: string;

    @Column({ type: 'integer', default: 0 })
    star: number;

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: User;

    @ManyToOne(() => Post, (post) => post.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    post: Post
}
