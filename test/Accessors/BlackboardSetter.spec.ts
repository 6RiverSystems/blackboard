import {assert} from 'chai';

import {InMemoryMapBlackboard} from '../../lib';
import {BlackboardSetter} from '../../lib/Accessors';
import {BlackboardRef} from '../../lib/BlackboardRef';

describe('BlackboardSetter', function() {
	const bb = new InMemoryMapBlackboard();
	const r = new BlackboardRef<number>('test');
	const a = new BlackboardSetter(r);
	it('sets', function() {
		a.set(bb, 3);
		assert.strictEqual(bb.get(r), 3);
	});
});
