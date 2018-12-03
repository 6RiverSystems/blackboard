import {Blackboard} from './Blackboard';
import {BlackboardRef, blackboardRefToString, stringToBlackboardRef} from './BlackboardRef';

export class InMemoryMapBlackboard<T> implements Blackboard<T> {
	private readonly state: Map<string, T>

	public get(blackboardRef: BlackboardRef) {
		return this.state.get(blackboardRefToString(blackboardRef));
	}

	public put(blackboardRef: BlackboardRef, value: T) {
		this.state.set(blackboardRefToString(blackboardRef), value);
		return this;
	}

	public delete(blackboardRef: BlackboardRef): boolean {
		return this.state.delete(blackboardRefToString(blackboardRef));
	}
}
