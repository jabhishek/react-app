import {generateSummary} from './utils';

describe('generate summary', () => {
	it('should return an array', () => {
		expect(typeof generateSummary([], ['Size'], 'Manufacturer')).to.equal('object');
	});
	it('should create the summary correctly', () => {
		const data = [
			{Size: '12', Colour: 'Red', Manufacturer: 'A', Count: 10},
			{Size: '12', Colour: 'Green', Manufacturer: 'A', Count: 20},
			{Size: '14', Colour: 'Red', Manufacturer: 'A', Count: 10},
			{Size: '14', Colour: 'Red', Manufacturer: 'B', Count: 20}
		];
		expect(generateSummary(data, ['Size'], 'Manufacturer')).to.deep.equal(
			{'Size//12.Manufacturer//A': 30, 'Size//14.Manufacturer//A': 10, 'Size//14.Manufacturer//B': 20}
		);
	});
	it('should create the summary correctly', () => {
		const data = [
			{Size: '12', Colour: 'Red', Manufacturer: 'A', Count: 10},
			{Size: '12', Colour: 'Green', Manufacturer: 'A', Count: 20},
			{Size: '14', Colour: 'Red', Manufacturer: 'A', Count: 10},
			{Size: '14', Colour: 'Red', Manufacturer: 'B', Count: 20}
		];
		expect(generateSummary(data, ['Size', 'Colour'], 'Manufacturer')).to.deep.equal(
			{'Size//12.Colour//Red.Manufacturer//A': 10, 'Size//12.Colour//Green.Manufacturer//A': 20, 'Size//14.Colour//Red.Manufacturer//A': 10, 'Size//14.Colour//Red.Manufacturer//B': 20}
		);
	});
});
