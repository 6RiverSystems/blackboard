import {Blackboard} from '../Blackboard';
import {BlackboardRef} from '../BlackboardRef';

export class BlackboardSetter<T> {
	constructor(private readonly ref: BlackboardRef<T>) {}
	public set(blackboard: Blackboard, value: T) {
		return blackboard.put(this.ref, value);
	}
}
