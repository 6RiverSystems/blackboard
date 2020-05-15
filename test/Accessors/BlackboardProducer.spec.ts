import {assert} from 'chai';

import {InMemoryMapBlackboard} from '../../lib';
import {BlackboardProducer} from '../../lib/Accessors';
import {BlackboardRef} from '../../lib/BlackboardRef';

describe('BlackboardProducer', function() {
	let bb = new InMemoryMapBlackboard();
	const r = new BlackboardRef<number>('test');
	const a = new BlackboardProducer(r);

	beforeEach(function() {
		bb = new InMemoryMapBlackboard();
	});

	it('succeeds with empty slot', function() {
		a.produce(bb, 3);
	});
	it('fails if slot is occupied', function() {
		let threw = false;
		a.produce(bb, 3);
		try {
			a.produce(bb, 4);
		} catch (err) {
			threw = true;
		}
		assert.isTrue(threw);
		assert.strictEqual(bb.get(r), 3);
	});
});
