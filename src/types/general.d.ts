
declare namespace Express {
	export type Request = {
		user: { id: string} | null;
	};
}
