import {BlackboardRef} from "./BlackboardRef";

export interface Blackboard<T> {
	get(ref: BlackboardRef): T | undefined;
	put(ref: BlackboardRef, value: T): this;
	delete(ref: BlackboardRef): boolean;
}