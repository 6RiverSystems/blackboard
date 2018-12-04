import {Blackboard} from './Blackboard';
import {BlackboardRef, blackboardRefToString} from './BlackboardRef';

export class InMemoryMapBlackboard implements Blackboard {
	private readonly state: Map<string, any> = new Map();

	public get<T>(blackboardRef: BlackboardRef): T {
		return this.state.get(blackboardRefToString(blackboardRef));
	}

	public put(blackboardRef: BlackboardRef, value: any) {
		this.state.set(blackboardRefToString(blackboardRef), value);
		return this;
	}

	public delete(blackboardRef: BlackboardRef) {
		return this.state.delete(blackboardRefToString(blackboardRef));
	}
}
