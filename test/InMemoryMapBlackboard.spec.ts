import {assert} from 'chai';
import {InMemoryMapBlackboard} from '../lib/InMemoryMapBlackboard';

describe('InMemoryMapBlackboard', function() {
	it('create', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef = {uuid: '91f2053e-f74c-11e8-8eb2-f2801f1b9fd1', name: 'someName'};
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
		const bbRef = {uuid: '91f2053e-f74c-11e8-8eb2-f2801f1b9fd1', name: 'someName'};
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
		const bbRef = {uuid: '91f2053e-f74c-11e8-8eb2-f2801f1b9fd1', name: 'someName'};
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
		const bbRef = {uuid: '91f2053e-f74c-11e8-8eb2-f2801f1b9fd1', name: 'someName'};
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
		const bbRef = {uuid: '91f2053e-f74c-11e8-8eb2-f2801f1b9fd1', name: 'someName'};
		const value = 'someValue';

		uut.put(bbRef, value);

		let deleteResult = uut.delete(bbRef);
		assert.isTrue(deleteResult);

		deleteResult = uut.delete(bbRef);
		assert.isFalse(deleteResult);
	});

	it('stateReadable', function() {
		const uut = new InMemoryMapBlackboard();
		const uuid1 = '91f2053e-f74c-11e8-8eb2-f2801f1b9fd1';
		const name1 = 'someName';
		const value1 = 'someValue1';
		const bbRef1 = {uuid: uuid1, name: name1};

		const uuid2 = 'e0562668-f8bb-11e8-8eb2-f2801f1b9fd1';
		const name2 = 'someName';
		const value2 = 'someValue2';
		const bbRef2 = {uuid: uuid2, name: name2};

		assert.deepStrictEqual(uut.stateReadable, {});

		uut.put(bbRef1, value1);

		assert.deepStrictEqual(uut.stateReadable, {[name1]: value1});

		uut.put(bbRef2, value2);

		deepStrictEqualOr(
			uut.stateReadable, 
			{
				[name1]: value1,
				[`${name2}-${uuid2}`]: value2,
			}, 
			{
				[`${name1}-${uuid1}`]: value1,
				[name2]: value2,
			}
		)
	});
});

function deepStrictEqualOr(a: any, ...possibilities: any[]) {
	for (let i = 0; i < possibilities.length; i++) {
		const b = possibilities[i];
		const lastPossibility = (i === possibilities.length - 1);
		try {
			assert.deepStrictEqual(a, b);
			return;
		} catch(err) {
			if (lastPossibility) {
				throw err;
			}
		}
	}
}
