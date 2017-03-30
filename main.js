var getURL = require('./getURL.js');
var url = "http://www.google.com/";
getURL.getURL(url).then((val)=>{
	console.log(val);
}).catch((err)=>{
	console.log(err);
});