import { BlackboardRef } from "../BlackboardRef";
import { Blackboard } from "../Blackboard";
import { BlackboardError } from "../BlackboardError";

export class BlackboardConsumer<T> {
	constructor(private readonly ref: BlackboardRef<T>) {}
	public consume(blackboard: Blackboard) {
		const state = blackboard.tryGet(this.ref);
		if (!state[0]) {
			throw new BlackboardError(this.ref, `Cannot consume with no data available for ${this.ref.name}`);
		}
		blackboard.delete(this.ref);
		return state[1];
	}
}