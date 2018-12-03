export interface BlackboardRef {
	readonly uuid: string,
	readonly name: string,
}

export function blackboardRefToString(blackboardRef: BlackboardRef) {
	return blackboardRef.uuid + '-' + blackboardRef.name;
}

export function stringToBlackboardRef(str: string) {
	return {
		uuid: str.substring(0, 36),
		name: str.substring(37),
	};
}
