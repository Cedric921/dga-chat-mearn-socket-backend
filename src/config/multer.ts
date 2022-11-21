import multer from 'multer';
import path from 'path';

export default multer({
	storage: multer.diskStorage({}),

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fileFilter: (req: any, file: any, cb: any) => {
		const ext = path.extname(file.originalname);
		if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
			cb(null, true);
		} else {
			cb(null, false);
		}
	},
});
