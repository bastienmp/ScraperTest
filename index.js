const rp = require('request-promise');
const cheerio = require('cheerio');
const REQUESTED_URL = "https://dl.bintray.com/ironsource-mobile/unity-adapters/";

const options = {
	uri: REQUESTED_URL,
	transform: (body) => { 
		return cheerio.load(body); 
	}
};

let json = {};

rp(options).then(($) => {
	let links = $('a'); // get all the link in the webpage
	$(links).each((i, link) => {
		let validateRex = /^IronSource+[a-zA-Z]+_v+[0-9]+[.]+[0-9]+[.]+[0-9]+.unitypackage$/gm;

		let fileName = $(link).text();

		if (validateRex.test(fileName))
		{
			let URL = REQUESTED_URL + fileName;

			let versionReg = /[0-9]+[.]+[0-9]+[.]+[0-9]+/gm;
			let version = versionReg.exec(fileName)[0];

			let nameReg = /^IronSource([a-zA-Z]*)Adapter_v/gm;
			let name = nameReg.exec(fileName)[1];

			if (!json[name])
				json[name] = {};
	
			json[name][version] = URL;

		}
		else
		{
			//TODO error
		}
	
	});
	console.log(json);
}).catch((error) => {
	console.error(error);
});
