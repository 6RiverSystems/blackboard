import uuid = require("uuid");

export class BlackboardRef<T> {
	private _uuid: string;
	private _name: string;
	// This is unused but prevents assigning, e.g. BlackboardRef<string> to BlackboardRef<number>
	private readonly _marker!: T;

	constructor(name: string, parent?: BlackboardRef<any>) {
		if ( parent ) {
			name = parent.name + '.' + name;
		}
		this._uuid = uuid.v4();
		this._name = name;
	}

	public createChild<U>(name: string): BlackboardRef<U> {
		return new BlackboardRef<U>(name, this);
	}

	public get uuid(): string {
		return this._uuid;
	}
	public get name(): string {
		return this._name;
	}
}
