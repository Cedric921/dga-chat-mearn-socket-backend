import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageShema = new Schema(
	{
		content: String,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		users: Array,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Message', messageShema);
