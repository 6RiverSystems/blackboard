import {Blackboard} from './Blackboard';
import {BlackboardRef} from './BlackboardRef';

export class InMemoryMapBlackboard implements Blackboard {
	private readonly keys: Set<string> = new Set<string>();
	private readonly state: Map<string, any> = new Map();

	public get<T>(blackboardRef: BlackboardRef<T>) {
		const k = this.blackboardRefToString(blackboardRef);
		if ( this.keys.has(k)){
			return this.state.get(k);
		} else {
			throw new Error(`could not locate reference for ${blackboardRef.name}`);
		}
	}

	public tryGet<T>(blackboardRef: BlackboardRef<T>): [boolean, T?] {
		const k = this.blackboardRefToString(blackboardRef);
		const exists = this.keys.has(k);
		return [exists, exists ? this.state.get(k) : undefined];
	}

	public create<T>(blackboardRef: BlackboardRef<T>, value: T) {
		const k = this.blackboardRefToString(blackboardRef);
		if (this.keys.has(k)) {
			throw new Error(`key already exists for ${blackboardRef.name}`);
		}
		this.keys.add(k);
		this.state.set(k, value);
	}

	public put<T>(blackboardRef: BlackboardRef<T>, value: T) {
		const k = this.blackboardRefToString(blackboardRef);
		this.keys.add(k);
		this.state.set(k, value);
	}

	public delete(blackboardRef: BlackboardRef<any>) {
		return this.state.delete(this.blackboardRefToString(blackboardRef));
	}

	private blackboardRefToString(blackboardRef: BlackboardRef<any>) {
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
