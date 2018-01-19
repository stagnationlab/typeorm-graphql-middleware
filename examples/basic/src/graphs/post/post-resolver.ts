import PostEntity from '../../entities/PostEntity';
import UserEntity from '../../entities/UserEntity';
import { resolve } from '../../../../../src/index';

const resolver: GQL.Resolver = {
	Query: {
		postList: resolve(PostEntity).find(),
	},

	Mutation: {
		addPost: async (_, { input }) => {
			const post = new PostEntity();
			Object.assign(post, { name: input.name });

			const user = await UserEntity.findOneById(input.userId);
			Object.assign(post, { user });

			await post.save();

			return post;
		},
	},
};

export default resolver;
