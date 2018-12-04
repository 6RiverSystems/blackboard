import {BlackboardRef} from "./BlackboardRef";

export interface Blackboard {
	create<T>(ref: BlackboardRef<T>, value: T): void;
	get<T>(ref: BlackboardRef<T>): T;
	tryGet<T>(ref: BlackboardRef<T>): [boolean, T?];
	put<T>(ref: BlackboardRef<T>, value: T): void;
	delete(ref: BlackboardRef<any>): boolean;
}