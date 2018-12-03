import {assert} from 'chai';
import {InMemoryMapBlackboard} from '../lib/InMemoryMapBlackboard';

describe('InMemoryMapBlackboard', function() {
	it('works', function() {
		const uut = new InMemoryMapBlackboard<string>();

		const bbRef = {
			uuid: '91f2053e-f74c-11e8-8eb2-f2801f1b9fd1',
			name: 'someName',
		};
		const value = 'someValue';

		const gottenUut = uut.put(bbRef, value);
		let gottenValue = uut.get(bbRef);
		assert.strictEqual(gottenUut, uut);
		assert.strictEqual(gottenValue, value);

		let deleteResult = uut.delete(bbRef);
		assert.isTrue(deleteResult);

		gottenValue = uut.get(bbRef);
		assert.isNotOk(gottenValue);

		deleteResult = uut.delete(bbRef);
		assert.isFalse(deleteResult);
	});
});
