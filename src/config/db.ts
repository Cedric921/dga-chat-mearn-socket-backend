/* eslint-disable no-console */
import mongoose from 'mongoose';

const connectDB = async () => {
	const MONGO_URI: string | undefined = process.env.MONGO_URI;
	try {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const con = await mongoose.connect(MONGO_URI!);
		console.log(`connected to Mongo db: ${con.connection.host}`);
	} catch (error) {
		console.log(error);
	}
};

export default connectDB;
