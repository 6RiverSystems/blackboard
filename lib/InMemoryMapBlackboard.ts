import {Blackboard} from './Blackboard';
import {BlackboardRef} from './BlackboardRef';

export class InMemoryMapBlackboard implements Blackboard {
	private readonly state: Map<string, any> = new Map();

	public get<T>(blackboardRef: BlackboardRef): T {
		return this.state.get(this.blackboardRefToString(blackboardRef));
	}

	public put(blackboardRef: BlackboardRef, value: any) {
		this.state.set(this.blackboardRefToString(blackboardRef), value);
		return this;
	}

	public delete(blackboardRef: BlackboardRef) {
		return this.state.delete(this.blackboardRefToString(blackboardRef));
	}

	private blackboardRefToString(blackboardRef: BlackboardRef) {
		return blackboardRef.uuid + '-' + blackboardRef.name;
	}

	// could be needed for enhanced serialization of Blackboard instances
	// private stringToBlackboardRef(str: string): BlackboardRef {
	// 	return {
	// 		uuid: str.substring(0, 36),
	// 		name: str.substring(37),
	// 	};
	// }
}
