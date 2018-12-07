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
	it('handles hierarchy', function() {
		const name = 'someName';
		const childName = 'childName';
		const uut = new BlackboardRefFactory();

		const bbRef = uut.manufacture(name);
		const childRef = uut.manufactureChild(bbRef, childName);

		assert.isOk(childRef.uuid);
		assert.isTrue(childRef.name.indexOf(name) >= 0);
		assert.isTrue(childRef.name.indexOf(childName) >= 0);
		assert.notEqual(childRef.name, childName);
		assert.notEqual(childRef.name, name);
	});
});
