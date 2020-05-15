import {assert} from 'chai';

import {BlackboardRef} from '../lib';
import {InMemoryMapBlackboard} from '../lib/InMemoryMapBlackboard';

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
		} catch (err) {
			thrown = true;
		}

		assert.isTrue(thrown);
	});

	context('is', function() {
		let uut = new InMemoryMapBlackboard();
		const bbRef = new BlackboardRef('test');
		beforeEach(function() {
			uut = new InMemoryMapBlackboard();
		});
		const refVals = [{}, [], new Map()];
		const valVals = ['', 'test', 3, 0, -1, true, false];
		const magicVals = [() => ({}), new Error('test')];
		context('same as stored', function() {
			const testTrue = (value: any) => () => {
				uut.create(bbRef, value);
				assert.isTrue(uut.is(bbRef, value));
			};
			context('reference types', function() {
				for (const value of refVals) {
					it(`works with ${value}`, testTrue(value));
				}
			});
			context('value types', function() {
				for (const value of valVals) {
					it(`works with ${value}`, testTrue(value));
				}
			});
			context('magic types', function() {
				for (const value of magicVals) {
					it(`works with ${value}`, testTrue(value));
				}
			});
		});
		context('get-clone', function() {
			const testFalse = (value: any) => () => {
				uut.create(bbRef, value);
				assert.isFalse(uut.is(bbRef, uut.get(bbRef)));
			};
			const testTrue = (value: any) => () => {
				uut.create(bbRef, value);
				assert.isTrue(uut.is(bbRef, uut.get(bbRef)));
			};
			context('reference types', function() {
				for (const value of refVals) {
					it(`works with ${value}`, testFalse(value));
				}
			});
			context('value types', function() {
				for (const value of valVals) {
					it(`works with ${value}`, testTrue(value));
				}
			});
			context('magic types', function() {
				for (const value of magicVals) {
					it(`works with ${value}`, testTrue(value));
				}
			});
		});
	});

	it('get', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef = new BlackboardRef('someName');
		const value = 'someValue';

		let thrown = false;

		try {
			uut.get(bbRef);
		} catch (err) {
			thrown = true;
		}

		assert.isTrue(thrown);

		uut.put(bbRef, value);

		const gottenValue = uut.get(bbRef);

		assert.strictEqual(gottenValue, value);
	});

	it('get clone where appropriate', function() {
		const uut = new InMemoryMapBlackboard();

		const bbRefObj = new BlackboardRef<{foo: string}>('obj');
		const bbRefFunc = new BlackboardRef<() => boolean>('func');
		const bbRefErr = new BlackboardRef<Error>('err');

		const valueObj = {foo: 'asdf'};
		const valueFunc = () => true;
		const valueErr = new Error();

		uut.put(bbRefObj, valueObj);
		uut.put(bbRefFunc, valueFunc);
		uut.put(bbRefErr, valueErr);

		const gottenValueObj = uut.get(bbRefObj);
		const gottenValueFunc = uut.get(bbRefFunc);
		const gottenValueErr = uut.get(bbRefErr);

		assert.notStrictEqual(gottenValueObj, valueObj);
		assert.strictEqual(gottenValueFunc, valueFunc);
		assert.strictEqual(gottenValueErr, valueErr);
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
		const value = 'someValue';

		uut.put(bbRef, value);

		let deleteResult = uut.delete(bbRef);
		assert.isTrue(deleteResult);

		deleteResult = uut.delete(bbRef);
		assert.isFalse(deleteResult);
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
		assert.deepStrictEqual(deleted, [r1, r2]);
		assert.lengthOf(Object.entries(uut.stateReadable), 1);
		deleted = uut.deleteAll([r1, r2]);
		assert.deepStrictEqual(deleted, []);
		assert.lengthOf(Object.entries(uut.stateReadable), 1);
	});

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
