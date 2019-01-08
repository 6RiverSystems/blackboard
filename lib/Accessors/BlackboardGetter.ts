import {BlackboardRef} from '../BlackboardRef';
import {Blackboard} from '../Blackboard';

export class BlackboardGetter<T> {
	constructor(private readonly ref: BlackboardRef<T>) {}
	public get(blackboard: Blackboard) {
		return blackboard.get(this.ref);
	}
	public tryGet(blackboard: Blackboard) {
		return blackboard.tryGet(this.ref);
	}
}
