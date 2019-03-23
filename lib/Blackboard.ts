import {BlackboardRef} from './BlackboardRef';

export interface Blackboard {
	create<T>(ref: BlackboardRef<T>, value: T): void;
	get<T>(ref: BlackboardRef<T>): T;
	tryGet<T>(ref: BlackboardRef<T>): [true, T]|[false, undefined];
	put<T>(ref: BlackboardRef<T>, value: T): void;
	delete(ref: BlackboardRef<any>): boolean;
	deleteAll(refs: BlackboardRef<any>[]): BlackboardRef<any>[];
}

function isFunction(maybeFunction: any): maybeFunction is Function {
	return maybeFunction !== null && maybeFunction !== undefined && typeof maybeFunction === 'function';
}

export const BLACKBOARD_METHODS = Object.freeze(['create', 'get', 'tryGet', 'put', 'delete', 'deleteAll']);

export function isBlackboard(maybeBlackboard: any): maybeBlackboard is Blackboard {
	return (maybeBlackboard !== null && maybeBlackboard !== undefined)
		&& !BLACKBOARD_METHODS.some((m) => !isFunction(maybeBlackboard[m]));
}
