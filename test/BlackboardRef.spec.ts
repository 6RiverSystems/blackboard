import {assert} from 'chai';
import {BlackboardRef} from '../lib/BlackboardRef';

describe('BlackboardRef', function() {
	it('works', function() {
		const name = 'someName';
		const uut = new BlackboardRef(name);

		assert.isOk(uut.uuid);
		assert.strictEqual(uut.name, name);
	});
	it('handles hierarchy', function() {
		const name = 'someName';
		const childName = 'childName';
		const grandChildName = 'grandChildName';
		const uut = new BlackboardRef(name);

		assert.isOk(uut.uuid);
		assert.strictEqual(uut.name, name);
		assert.lengthOf(uut.children, 0);

		const childRef = uut.createChild(childName);

		assert.isOk(childRef.uuid);
		assert.isTrue(childRef.name.indexOf(name) >= 0);
		assert.isTrue(childRef.name.indexOf(childName) >= 0);
		assert.notEqual(childRef.name, childName);
		assert.notEqual(childRef.name, name);
		assert.lengthOf(uut.children, 1);
		assert.deepStrictEqual(uut.children, [childRef]);

		const grandChildRef = childRef.createChild(grandChildName);

		assert.isOk(grandChildRef.uuid);
		assert.lengthOf(grandChildRef.children, 0);
		assert.lengthOf(childRef.children, 1);
		assert.lengthOf(uut.children, 2);
	});
});
