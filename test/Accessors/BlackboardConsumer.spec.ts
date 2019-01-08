import {assert} from 'chai';
import {BlackboardRef} from '../../lib/BlackboardRef';
import {BlackboardConsumer} from '../../lib/Accessors/';
import { InMemoryMapBlackboard } from '../../lib';

describe('BlackboardConsumer', function() {
	let bb = new InMemoryMapBlackboard();
	const r = new BlackboardRef<number>('test');
	const a = new BlackboardConsumer(r);

	beforeEach(function() {bb = new InMemoryMapBlackboard()});

	it('fails for missing data', function() {
		let threw = false;
		try {
			a.consume(bb);
		} catch(err) {
			threw = true;
		}
		assert.isTrue(threw);
	});
	it('returns the consumed value', function() {
		const val = 3;
		bb.put(r, val);
		assert.equal(val, a.consume(bb));
	});
	it('deletes the consumed value', function() {
		bb.put(r, 3);
		a.consume(bb);
		assert.isFalse(bb.tryGet(r)[0]);
	});
});
