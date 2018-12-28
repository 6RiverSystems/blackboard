import { BlackboardRef } from "../BlackboardRef";
import { Blackboard } from "../Blackboard";

export class BlackboardSetter<T> {
	constructor(private readonly ref: BlackboardRef<T>) {}
	public set(blackboard: Blackboard, value: T) {
		return blackboard.put(this.ref, value);
	}
}