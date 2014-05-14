
(function(global) {

	/*
	 * HELPERS
	 */

	var _path = require('path');
	var _url  = require('url');
	var _http = require('http');

	var _parse_settings = function(data) {

		// Not shared on prototype due to theoretical memleak issues
		var settings = {
			port: 8080,
			root: null
		};


		if (data instanceof Object) {
			settings.port = typeof data.port === 'number' ? (data.port | 0)            : settings.port;
			settings.root = typeof data.root === 'string' ? _path.normalize(data.root) : settings.root;
		}


		return settings;

	};



	/*
	 * IMPLEMENTATION
	 */

	var Proxy = function(data) {

		var settings = _parse_settings(data);


		this.root = settings.root;
		this.port = settings.port;


		settings = null;

	};


	Proxy.prototype = {

		start: function() {

console.log(this);

		}

	};



	/*
	 * LIBRARY INTEGRATION
	 */

	module.exports = Proxy;

})(this);
