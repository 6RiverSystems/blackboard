import {assert} from 'chai';
import {InMemoryMapBlackboard} from '../lib/InMemoryMapBlackboard';
import { BlackboardRef } from '../lib';

describe('InMemoryMapBlackboard', function() {
	it('create', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef = new BlackboardRef('someName');
		const value = 'someValue';

		uut.create(bbRef, value);

		const [exists, gottenValue] = uut.tryGet(bbRef);
		assert.isTrue(exists);
		assert.strictEqual(gottenValue, value);

		let thrown = false;

		try {
			uut.create(bbRef, value);
		} catch(err) {
			thrown = true;
		}

		assert.isTrue(thrown);
	});

	it('get', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef = new BlackboardRef('someName');
		const value = 'someValue';

		let thrown = false;

		try {
			uut.get(bbRef);
		} catch(err) {
			thrown = true;
		}

		assert.isTrue(thrown);

		uut.put(bbRef, value);

		const gottenValue = uut.get(bbRef);

		assert.strictEqual(gottenValue, value);
	});

	it('tryGet', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef = new BlackboardRef('someName');
		const value = 'someValue';

		let [exists, gottenValue] = uut.tryGet(bbRef);

		assert.isFalse(exists);

		uut.put(bbRef, value);

		[exists, gottenValue] = uut.tryGet(bbRef);

		assert.isTrue(exists);
		assert.strictEqual(gottenValue, value);
	});

	it('put', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef = new BlackboardRef('someName');
		const value = 'someValue';

		uut.put(bbRef, value);

		let [exists, gottenValue] = uut.tryGet(bbRef);
		assert.isTrue(exists);
		assert.strictEqual(gottenValue, value);

		uut.put(bbRef, value);

		[exists, gottenValue] = uut.tryGet(bbRef);
		assert.isTrue(exists);
		assert.strictEqual(gottenValue, value);
	});

	it('delete', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef = new BlackboardRef('someName');
		const bbRefChild = bbRef.createChild('child');
		const bbRefGrandChild = bbRefChild.createChild('grandChild');
		const value = 'someValue';
		const valueChild = 'someValueChild';
		const valueGrandChild = 'someValueGrandChild';

		uut.put(bbRef, value);
		uut.put(bbRefChild, valueChild);
		uut.put(bbRefGrandChild, valueGrandChild);

		// recursive delete
		let deleteResult = uut.delete(bbRefChild);
		assert.isTrue(deleteResult);
		assert.lengthOf(Object.entries(uut.stateReadable), 1);
		assert.strictEqual(uut.get(bbRef), value);

		// non-recursive delete
		deleteResult = uut.delete(bbRef);
		assert.isTrue(deleteResult);
		assert.lengthOf(Object.entries(uut.stateReadable), 0);

		// subsequent identical deletes
		deleteResult = uut.delete(bbRef);
		assert.isFalse(deleteResult);
		assert.lengthOf(Object.entries(uut.stateReadable), 0);
	});

	it('deleteAll', function() {
		const uut = new InMemoryMapBlackboard();
		const r1 = new BlackboardRef('r1');
		const r2 = new BlackboardRef('r2');
		const r3 = new BlackboardRef('r3');
		uut.put(r1, 1);
		uut.put(r2, 2);
		uut.put(r3, 3);
		assert.lengthOf(Object.entries(uut.stateReadable), 3);
		let deleted = uut.deleteAll([r1, r2]);
		assert.deepStrictEqual(deleted, [true, true]);
		assert.lengthOf(Object.entries(uut.stateReadable), 1);
		deleted = uut.deleteAll([r1, r2]);
		assert.deepStrictEqual(deleted, [false, false]);
		assert.lengthOf(Object.entries(uut.stateReadable), 1);
	})

	it('stateReadable', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef1 = new BlackboardRef('someName');
		const bbRef2 = new BlackboardRef('someName');
		const value1 = 'someValue1';
		const value2 = 'someValue2';

		assert.deepStrictEqual(uut.stateReadable, {});

		uut.put(bbRef1, value1);

		assert.lengthOf(Object.entries(uut.stateReadable), 1);

		uut.put(bbRef2, value2);

		assert.lengthOf(Object.entries(uut.stateReadable), 2);

		const values = Object.values(uut.stateReadable);
		assert.include(values, value1 as unknown as object); // WTF TS 3
		assert.include(values, value2 as unknown as object); // WTF TS 3
	});
});