import {Blackboard} from '../Blackboard';
import {BlackboardRef} from '../BlackboardRef';

export class BlackboardGetter<T> {
	constructor(private readonly ref: BlackboardRef<T>) {}
	public get(blackboard: Blackboard) {
		return blackboard.get(this.ref);
	}
	public tryGet(blackboard: Blackboard) {
		return blackboard.tryGet(this.ref);
	}
}
