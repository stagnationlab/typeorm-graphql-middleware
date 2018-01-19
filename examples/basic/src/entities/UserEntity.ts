import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import PostEntity from './PostEntity';

@Entity('users')
export default class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn() public id: string;

	@Column({ type: 'varchar', nullable: false, length: 255 })
	public name: string;

	@OneToMany(_ => PostEntity, post => post.user)
	public posts: Promise<PostEntity[]>;

	// @Column({ nullable: true })
	// public parentFriendId: string;
}
