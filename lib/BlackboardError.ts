import {BlackboardRef} from './BlackboardRef';

export class BlackboardError extends Error {
	constructor(public readonly ref: BlackboardRef<any>, message: string) {
		super(message);
	}
}
