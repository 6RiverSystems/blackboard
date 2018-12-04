export interface BlackboardRef {
	readonly uuid: string,
	readonly name: string,
}

export function blackboardRefToString(blackboardRef: BlackboardRef) {
	return blackboardRef.uuid + '-' + blackboardRef.name;
}

// could be needed for enhanced serialization of Blackboard instances
// export function stringToBlackboardRef(str: string): BlackboardRef {
// 	return {
// 		uuid: str.substring(0, 36),
// 		name: str.substring(37),
// 	};
// }
