import {BlackboardRef} from "./BlackboardRef";
import * as uuid from 'uuid';

export class BlackboardRefFactory {
	public manufacture<T>(name: string): BlackboardRef<T> {
		return {
			uuid: uuid.v4(),
			name
		};
	}
	public manufactureChild<T>(parent: BlackboardRef<any>, childName: string): BlackboardRef<T> {
		return {
			uuid: uuid.v4(),
			name: parent.name + '.' + childName
		};
	}

}
