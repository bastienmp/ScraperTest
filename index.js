const https = require('https');
const cheerio = require('cheerio');

const options = {
  hostname: 'dl.bintray.com',
  port: 443,
  path: '/ironsource-mobile/unity-adapters/',
  method: 'GET'
};

var data = "";
var json = {};
const req = https.request(options, (res) => {
	res.on('data', (chunk) => {
		data += chunk;
	});

	res.on('end', () => {
		const $ = cheerio.load(data);
		var links = $('a'); // get all the link in the webpage
		$(links).each((i, link) => {
			var fileName = $(link).text();
			var URL = "https://dl.bintray.com/ironsource-mobile/unity-adapters/" + fileName;
			var version = fileName.slice(fileName.indexOf("Adapter_v") + 9, fileName.indexOf(".unitypackage"));
			var name = fileName.slice(10, fileName.indexOf("Adapter_v"));

			var regExpVersion = /[0-9]+[.]+[0-9]+[.]+[0-9]+/gm;
			if (!regExpVersion.test(version))
			{				
				//TODO handle error
			}	

			if (!json[name])
				json[name] = {};

			json[name][version] = URL;
		});
		console.log(JSON.stringify(json));
	});
});

req.on('error', error => {
  console.error(error);
});

req.end();

