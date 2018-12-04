import {assert} from 'chai';
import {BlackboardRefFactory} from '../lib/BlackboardRefFactory';

describe('BlackboardRefFactory', function() {
	it('works', function() {
		const name = 'someName';
		const uut = new BlackboardRefFactory();

		const bbRef = uut.manufacture(name);

		assert.isOk(bbRef.uuid);
		assert.strictEqual(bbRef.name, name);
	});
});
