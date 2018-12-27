import {assert} from 'chai';
import {InMemoryMapBlackboard} from '../lib/InMemoryMapBlackboard';
import { BlackboardRef } from '../lib';

describe('InMemoryMapBlackboard', function() {
	it('create', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef = new BlackboardRef<string>('someName');
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
		const bbRef = new BlackboardRef<string>('someName');
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

	it('get object with getters', function() {
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
		const bbRef = new BlackboardRef<string>('someName');
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
		const bbRef = new BlackboardRef<string>('someName');
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
		const bbRef = new BlackboardRef<string>('someName');
		const value = 'someValue';

		uut.put(bbRef, value);

		let deleteResult = uut.delete(bbRef);
		assert.isTrue(deleteResult);

		deleteResult = uut.delete(bbRef);
		assert.isFalse(deleteResult);
	});

	it('deleteAll', function() {
		const uut = new InMemoryMapBlackboard();
		const r1 = new BlackboardRef<number>('r1');
		const r2 = new BlackboardRef<number>('r2');
		const r3 = new BlackboardRef<number>('r3');
		uut.put(r1, 1);
		uut.put(r2, 2);
		uut.put(r3, 3);
		assert.lengthOf(Object.entries(uut.stateReadable), 3);
		let deleted = uut.deleteAll([r1, r2]);
		assert.deepStrictEqual(deleted, [r1, r2]);
		assert.lengthOf(Object.entries(uut.stateReadable), 1);
		deleted = uut.deleteAll([r1, r2]);
		assert.deepStrictEqual(deleted, []);
		assert.lengthOf(Object.entries(uut.stateReadable), 1);
	})

	it('stateReadable', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef1 = new BlackboardRef<string>('someName');
		const bbRef2 = new BlackboardRef<string>('someName');
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
