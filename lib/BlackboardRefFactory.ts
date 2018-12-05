import {BlackboardRef} from "./BlackboardRef";
import * as uuid from 'uuid';

export class BlackboardRefFactory {
	public manufacture<T>(name: string): BlackboardRef<T> {
		return {
			uuid: uuid.v4(),
			name
		};
	}
}
