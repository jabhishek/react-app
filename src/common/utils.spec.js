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
			{
				'Size//12': [
					{key: 'Manufacturer//A', count: 30}
				],
				'Size//14': [
					{key: 'Manufacturer//A', count: 10},
					{key: 'Manufacturer//B', count: 20}
				]
			}
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
			{
				'Size//12.Colour//Red': [
					{key: 'Manufacturer//A', count: 10}
				],
				'Size//12.Colour//Green': [
					{key: 'Manufacturer//A', count: 20}
				],
				'Size//14.Colour//Red': [
					{key: 'Manufacturer//A', count: 10},
					{key: 'Manufacturer//B', count: 20}
				]
			}
		);
	});
});
