import { injectable, inject } from 'inversify';
import beans from '/core/beans.ts';
import Config from '/utils/config.ts';

@injectable()
export default class ErrorHandler {
	constructor(@inject(beans.CONFIG) private config: Config) {
	}
	async handle(err: any) {
		console.log('========================');
		console.log(err);
		console.log('========================')
	}
}