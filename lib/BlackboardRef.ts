import uuid = require("uuid");

export class BlackboardRef<T> {
	private _uuid: string;
	private _name: string;

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
