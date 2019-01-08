import {assert} from 'chai';
import {BlackboardRef} from '../../lib/BlackboardRef';
import {BlackboardGetter} from '../../lib/Accessors';
import { InMemoryMapBlackboard } from '../../lib';

describe('BlackboardGetter', function() {
	let bb = new InMemoryMapBlackboard();
	const r = new BlackboardRef<number>('test');
	const a = new BlackboardGetter(r);

	beforeEach(function() {bb = new InMemoryMapBlackboard()});

	context('get', function() {
		it('fails for lack of data', function() {
			let threw = false;
			try {
				a.get(bb);
			} catch(err) {
				threw = true;
			}
			assert.isTrue(threw);
		});
		it('succeeds with data', function() {
			const val = 3;
			bb.put(r, val);
			assert.equal(val, a.get(bb));
		});
	});
	context('tryGet', function() {
		it('returns missing for lack of data', function() {
			assert.isFalse(a.tryGet(bb)[0]);
		});
		it('returns found + data for data', function() {
			const val = 3;
			bb.put(r, val);
			const result = a.tryGet(bb);
			assert.isTrue(result[0]);
			assert.strictEqual(result[1], val);
		});
	})
});
