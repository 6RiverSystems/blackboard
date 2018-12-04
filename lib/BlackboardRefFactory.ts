import {BlackboardRef} from "./BlackboardRef";
import * as uuid from 'uuid';

export class BlackboardRefFactory {
	public manufacture(name: string): BlackboardRef {
		return {
			uuid: uuid.v4(),
			name
		};
	}
}
