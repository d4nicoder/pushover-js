var https 		= require( 'https' );
var querystring = require( 'querystring' );
var url 		= require( 'url' );

/**
 * Definición de la clase
 * @param {object} obj Objecto con el user y el token
 */
function Pushover(obj, callback){

	if (obj == undefined){
		console.log("Missing parameters");
		return false;
	}

	if (obj.user == undefined){
		console.log("Invalid user");
		return false;
	}

	if (obj.token == undefined){
		console.log("Invalid token");
		return false;
	}

	this.USER 				= obj.user;
	this.TOKEN 				= obj.token;


	this.urlVerification 	= "https://api.pushover.net/1/users/validate.json";
	this.urlSendMessage 	= "https://api.pushover.net/1/messages.json";

	this.check 		= PushoverCheckUser;
	this.send 		= PushoverSend;

	this.check(callback);
}


function PushoverCheckUser(callback){

	var me 		= this;

	var u 		= url.parse(me.urlVerification);

	var req_string 	= {
		user 	: me.USER,
		token 	: me.TOKEN
	}

	req_string = querystring.stringify( req_string );

	var options	= {
		host 	: u.hostname,
		port 	: 443,
		path 	: u.path,
		method 	: 'POST'
	};

	options.headers = {
		'Content-Length': req_string.length
	};

	var req 	= https.request(options, function (res){
		if (res.statusCode != 200){
			// Verification failed
			if (callback != undefined){
				callback(true, "Response code: " + res.statusCode);
			}
		} else {
			res.setEncoding('utf8');
			res.on('data', function (d){
				
				var status 	= JSON.parse(d);
				if (status.status == 1){
					// User verified
					if (callback != undefined){
						callback(false, status);	
					}
				} else {
					// Invalid token
					if (callback != undefined){
						callback(true, status);
					}
				}
			});
		}
	});

	req.end(req_string);

}


function PushoverSend(obj, callback){

	var me 	= this;

	if (obj == undefined){
		if (callback != undefined){
			callback("Incorrect parameters", null);
		}
		return false;
	}

	if (obj.message == undefined){
		if (callback != undefined){
			callback("Message required", null);
		}
		return false;
	}

	if (obj.title == undefined){
		if (callback != undefined){
			callback("Title required", null);
		}
		return false;
	}

	var prior 	= (obj.priority == undefined) ? 0 : parseInt(obj.priority);
	var sound 	= (obj.sound == undefined) ? "pushover" : obj.sound;

	var req_string 	= {
		user 		: me.USER,
		token 		: me.TOKEN,
		title 		: obj.title,
		message 	: obj.message,
		sound 		: sound,
		priority 	: prior
	};

	if (prior == 2){
		req_string.retry 	= 30;
		req_string.expire 	= 600;
	}

	req_string = querystring.stringify( req_string );

	var u 		= url.parse(me.urlSendMessage);

	var options	= {
		host 	: u.hostname,
		port 	: 443,
		path 	: u.path,
		method 	: 'POST'
	};

	options.headers = {
		'Content-Length': req_string.length
	};

	var req 	= https.request(options, function (res){
		
		let responseData = ''
		res.setEncoding( 'utf8' );
		res.on('data', function (d) {
			responseData = responseData + d.toString()
		})
		res.on('end', function () {
			let data
			try {
				data 	= JSON.parse(responseData);
			} catch (e) {
				console.error(e);
				console.error('Error parsing response');
			}

			if (res.statusCode != 200){
				if (callback != undefined){
					callback("Sending error. Code: " + res.statusCode, data);
				}
			} else {
				if (callback != undefined){
					callback(false, data);
				}
			}
			return true;
		});
	});

	req.end(req_string);
}


exports = module.exports = Pushover;
