
const colours = ['Dark Blue', 'Light Blue', 'Red', 'Yellow'];
const countries = ['Germany', 'United Kingdom', 'France', 'Austria'];
const manufacturers = ['The Hipster Jeans Company', 'Denzil Jeans', 'Wrangled Jeans'];
const sizes = ['12', '14', '16'];
const genders = ['M', 'F'];
const styles = ['Relaxed', 'Skinny', 'Boot Cut'];

const getRandomItem = items => items[ Math.floor(Math.random() * items.length) ];
const getRandomMonth = () => Math.ceil(Math.random() * 12);

const getData = () => {
	return Array.from({ length: 200 }, () => {
		return {
			OrderDate: `1/${getRandomMonth()}/16`,
			DeliveryCountry: getRandomItem(countries),
			Manufacturer: getRandomItem(manufacturers),
			Gender: getRandomItem(genders),
			Size: getRandomItem(sizes),
			Colour: getRandomItem(colours),
			Style: getRandomItem(styles),
			Count: Math.ceil(Math.random() * 1000)
		};
	});
};

module.exports = getData();
