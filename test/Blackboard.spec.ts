import {assert} from 'chai';
import {isBlackboard, BLACKBOARD_METHODS} from '../lib/Blackboard';

function getMockBlackboard() {
	return BLACKBOARD_METHODS.reduce((obj, meth) => (obj[meth] = () => ({}), obj), {} as any);
}

describe('Blackboard', function() {
	context('user-defined type-guard', function() {
		it('succeeds when all properties are present and functions', function() {
			assert.isTrue(isBlackboard(getMockBlackboard()));
		});
		context('per-property checks', function() {
			for (const prop of BLACKBOARD_METHODS) {
				context(prop, function() {
					it('fails if prop is missing', function() {
						const bb: any = getMockBlackboard();
						delete bb[prop];
						assert.isFalse(isBlackboard(bb));
					});
					it('fails if prop is wrong', function() {
						const bb: any = getMockBlackboard();
						bb[prop] = 'not a function';
						assert.isFalse(isBlackboard(bb));
					});
				});
			}
		});
	});
});
