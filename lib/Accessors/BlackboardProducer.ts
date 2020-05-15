import {Blackboard} from '../Blackboard';
import {BlackboardError} from '../BlackboardError';
import {BlackboardRef} from '../BlackboardRef';

export class BlackboardProducer<T> {
	constructor(private readonly ref: BlackboardRef<T>) {}
	public produce(blackboard: Blackboard, value: T) {
		if (blackboard.tryGet(this.ref)[0]) {
			throw new BlackboardError(this.ref, `Cannot produce with unconsumed data remaining for ${this.ref.name}`);
		}
		return blackboard.put(this.ref, value);
	}
}
