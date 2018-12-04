import {BlackboardRef} from "./BlackboardRef";

export interface Blackboard {
	get<T>(ref: BlackboardRef): T | undefined;
	put(ref: BlackboardRef, value: any): this;
	delete(ref: BlackboardRef): boolean;
}