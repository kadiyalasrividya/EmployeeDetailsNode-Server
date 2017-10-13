/**
 * http://usejsdoc.org/
 */

var chai = require('chai');
var expect = chai.expect;

var calculator = require('./../Calculator');

describe('Calculator', function() {
	it('addNumber(2,3) should return 5', function() {
		expect(calculator.addNumber(2, 3)).to.equal(5);
	});
});
