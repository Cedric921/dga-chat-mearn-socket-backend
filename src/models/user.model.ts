import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
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
		passwoord: {
			type: String,
			require: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', userSchema);
