import { resolve } from '../../../../../src'; // import { resolve } from 'typeorm-graphql-middleware'
import UserEntity from '../../entities/UserEntity';
import PostEntity from '../../entities/PostEntity';

const userResolver: GQL.Resolver = {
	User: {
		// It can resolve posts itself also, but this way data-loader can cache them
		// posts: source => source.posts,
		// posts: resolve(UserEntity).many(({ source }) => source.posts),
		// posts: (source, _, { loader }) => loader(UserEntity).find(source.posts),
		posts: resolve(PostEntity).find(({ source }) => ({ where: { userId: source.id } })),
		// TODO: resolve-helper.ts annotations do not yet support this
		// posts: resolve(UserEntity).many(({ source }) => source.posts),
	},

	Query: {
		// without data-loader
		// users: () => UserEntity.find(),
		// with data-loader
		// users: (_, __, { loader }) => loader(UserEntity).find(),
		// with data-loader helper
		userList: resolve(UserEntity).find(),
		// users: (_, __, { loader }) => loader(),
	},

	Mutation: {
		addUser: async (_, { input }, {}) => {
			const user = new UserEntity();
			Object.assign(user, { name: input.name });

			if (input.posts) {
				const posts = await UserEntity.findByIds(input.posts);
				Object.assign(user, { posts });
			}

			await user.save();

			return user;
		},
	},
};

export default userResolver;
