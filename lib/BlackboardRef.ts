import * as uuid from 'uuid';

export class BlackboardRef<T> {
	private readonly _uuid: string;
	private readonly _name: string;
	private readonly _children: BlackboardRef<any>[] = [];
	// This is unused but prevents assigning, e.g. BlackboardRef<string> to BlackboardRef<number>
	protected readonly _marker!: T;

	constructor(name: string, parent?: BlackboardRef<any>) {
		if (parent) {
			name = parent.name + '.' + name;
		}
		this._uuid = uuid.v4();
		this._name = name;
	}

	public createChild<U>(name: string): BlackboardRef<U> {
		const ref = new BlackboardRef<U>(name, this);
		this._children.push(ref);
		return ref;
	}

	public get children(): ReadonlyArray<BlackboardRef<any>> {
		return this._children;
	}

	public get descendants(): BlackboardRef<any>[] {
		return this._children.concat(...this._children.map((c) => c.descendants));
	}

	public get uuid(): string {
		return this._uuid;
	}

	public get name(): string {
		return this._name;
	}
}
