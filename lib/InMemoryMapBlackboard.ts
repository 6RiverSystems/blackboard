import {Blackboard} from './Blackboard';
import {BlackboardRef} from './BlackboardRef';
import * as _ from 'lodash';
import {BlackboardError} from './BlackboardError';

export class InMemoryMapBlackboard implements Blackboard {
	private readonly state: Map<string, [BlackboardRef<any>, any]> = new Map();

	public is<T>(ref: BlackboardRef<T>, value: T) {
		return this.state.has(ref.uuid) && this.state.get(ref.uuid)![1] === value;
	}

	public get<T>(ref: BlackboardRef<T>) {
		if (this.state.has(ref.uuid)) {
			return InMemoryMapBlackboard.cloneObject(this.state.get(ref.uuid)![1]);
		} else {
			throw new BlackboardError(ref, `could not locate reference for ${ref.name}`);
		}
	}

	public tryGet<T>(ref: BlackboardRef<T>): [true, T]|[false, undefined] {
		const exists = this.state.has(ref.uuid);
		if (exists) {
			return [exists, InMemoryMapBlackboard.cloneObject(this.state.get(ref.uuid)![1])];
		} else {
			return [exists, undefined];
		}
	}

	public create<T>(ref: BlackboardRef<T>, value: T) {
		if (this.state.has(ref.uuid)) {
			throw new BlackboardError(ref, `key already exists for ${ref.name}`);
		}
		this.state.set(ref.uuid, [ref, value]);
	}

	public put<T>(ref: BlackboardRef<T>, value: T) {
		this.state.set(ref.uuid, [ref, value]);
	}

	public delete(ref: BlackboardRef<any>) {
		return this.state.delete(ref.uuid);
	}

	public deleteAll(refs: BlackboardRef<any>[]) {
		return refs.filter((r) => this.delete(r));
	}

	// handy method for viewing in the debugger and logging
	// Q: why is this method public?
	// A: cfs_models depends on this method. Therefore, changes to this method should be considered breaking
	// Q: doesn't exposing entire state of the blackboard compromise component isolation?
	// A: no, because this method is not in the Blackboard interface
	public get stateReadable(): {[K in string]?: object} {
		return [...this.state.entries()].reduce((acc, next) => {
			const uuid = next[0];
			const name = next[1][0].name;
			const value = next[1][1];
			if (acc.hasOwnProperty(name)) {
				return {...acc, [name + '-' + uuid]: value};
			} else {
				return {...acc, [name]: value};
			}
		}, {});
	}

	private static cloneObject<T>(obj: T) {
		// NOTE: lodash clone is "loosely based on the structured clone algorithm" which doesn't handle certian object
		// types, so for now just passing them through (otherwise lodash returns an empty object)
		//		see here: https://lodash.com/docs/4.17.11#clone
		//		and here: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)
		if (obj instanceof Function ||
			obj instanceof Error) {
			return obj;
		}

		return _.cloneDeep(obj);
	}
}
