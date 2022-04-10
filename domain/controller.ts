import { SessionUser } from '/domain/user/session_user.ts';
import { CookiesSetDeleteOptions } from 'oak';

/** Request data to controllers */
export interface ControllerRequest<Query, Body, Params> {
	body?: Body;
	params?: Params;
	query?: Query;
}

/** Response from controllers */
export interface ControllerResponse<Body> {
	data?: Body;
	headers?: { [key: string]: string };
	cookies?: { name: string, value: string, options?: CookiesSetDeleteOptions }[];
}

/** Context passed in controller request */
export interface Context {
	requestId?: string;
	user?: SessionUser;
	route?: URL;
	request?: ControllerRequest<unknown, unknown, unknown>;
	response?: ControllerResponse<unknown>;
}
