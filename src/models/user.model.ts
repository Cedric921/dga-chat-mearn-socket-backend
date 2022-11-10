import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		lastname: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
		},
		username: {
			type: String,
			require: false,
		},
		password: {
			type: String,
			require: true,
		},
		imageUrl: String,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', userSchema);
