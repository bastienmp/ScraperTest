const rp = require('request-promise');
const cheerio = require('cheerio');

const URL_IRONSOURCE_UNITYADAPTER = "https://dl.bintray.com/ironsource-mobile/unity-adapters/";
const REGEX_IRONSOURCE_UNITYADAPTER = /IronSource(.*)Adapter_v(.*).unitypackage/; //Regex which create two groups, first one for name, second one for version

async function scrapLinkFromURL(url, regex, indexNameGroup, indexVersionGroup)
{
	const options = {
		uri: url,
		transform: (body) => { 
			return cheerio.load(body); 
		}
	};

	let json = {};
	const $ = await rp(options);

	//get all the links:
	let links = $('a');

	$(links).each((i, link) => {
		//extract full filename
		let fileName = $(link).text(); 

		let regResults = regex.exec(fileName);

		if (regResults != null && indexVersionGroup < regResults.length && indexNameGroup < regResults.length)
		{
			let URL = url + fileName;
			let name = regResults[indexNameGroup];
			let version = regResults[indexVersionGroup];

			if (!json[name])
				json[name] = {};
			json[name][version] = URL;
		}
		else
		{				
			//Error
			console.error(fileName + " doesnt pass the regex " + regex + " (from: " + url + ").");
		}
	});

	return json;
}

scrapLinkFromURL(URL_IRONSOURCE_UNITYADAPTER, REGEX_IRONSOURCE_UNITYADAPTER, 1, 2).then((json) => {
	console.log(json);
});