import {assert} from 'chai';
import {InMemoryMapBlackboard} from '../lib/InMemoryMapBlackboard';

describe('InMemoryMapBlackboard', function() {
	it('CREATE', function() {
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

	it('GET', function() {
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

	it('TRYGET', function() {
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

	it('PUT', function() {
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

	it('DELETE', function() {
		const uut = new InMemoryMapBlackboard();
		const bbRef = {uuid: '91f2053e-f74c-11e8-8eb2-f2801f1b9fd1', name: 'someName'};
		const value = 'someValue';

		uut.put(bbRef, value);

		let deleteResult = uut.delete(bbRef);
		assert.isTrue(deleteResult);

		deleteResult = uut.delete(bbRef);
		assert.isFalse(deleteResult);
	});
});
