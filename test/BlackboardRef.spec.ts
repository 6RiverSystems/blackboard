import {assert} from 'chai';
import {BlackboardRef} from '../lib/BlackboardRef';

describe('BlackboardRef', function() {
	it('works', function() {
		const name = 'someName';
		const uut = new BlackboardRef('root');

		assert.isOk(uut.uuid);
		assert.strictEqual(uut.name, name);
	});
	it('handles hierarchy', function() {
		const name = 'someName';
		const childName = 'childName';
		const uut = new BlackboardRef('root');

		assert.isOk(uut.uuid);
		assert.strictEqual(uut.name, name);

		const childRef = uut.createChild(childName);

		assert.isOk(childRef.uuid);
		assert.isTrue(childRef.name.indexOf(name) >= 0);
		assert.isTrue(childRef.name.indexOf(childName) >= 0);
		assert.notEqual(childRef.name, childName);
		assert.notEqual(childRef.name, name);
	});
});
