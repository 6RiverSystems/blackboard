import {Blackboard} from './Blackboard';
import {BlackboardRef} from './BlackboardRef';

export class InMemoryMapBlackboard implements Blackboard {
	private readonly state: Map<string, [BlackboardRef<any>, any]> = new Map();

	public get<T>(ref: BlackboardRef<T>) {
		if (this.state.has(ref.uuid)){
			return this.state.get(ref.uuid)![1];
		} else {
			throw new Error(`could not locate reference for ${ref.name}`);
		}
	}

	public tryGet<T>(ref: BlackboardRef<T>): [boolean, T?] {
		const exists = this.state.has(ref.uuid);
		return [exists, exists ? this.state.get(ref.uuid)![1] : undefined];
	}

	public create<T>(ref: BlackboardRef<T>, value: T) {
		if (this.state.has(ref.uuid)) {
			throw new Error(`key already exists for ${ref.name}`);
		}
		this.state.set(ref.uuid, [ref, value]);
	}

	public put<T>(ref: BlackboardRef<T>, value: T) {
		this.state.set(ref.uuid, [ref, value]);
	}

	public delete(ref: BlackboardRef<any>) {
		return this.state.delete(ref.uuid);
	}

	// handy for viewing in the debugger and logging
	private get stateReadable(): Object {
		return [...this.state.entries()].reduce((acc, next) => {
			const uuid = next[0];
			const name = next[1][0].name;
			const value = next[1][1];
			if (acc.hasOwnProperty(name)) {
				return {...acc, [name + '-' + uuid]: value};
			} else {
				return {...acc, [name]: value};
			}
		}, {})
	}
}
