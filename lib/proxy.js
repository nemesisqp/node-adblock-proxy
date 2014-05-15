
/*
 * POLYFILLS
 */

if (typeof String.prototype.trim !== 'function') {

	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};

}



(function(global) {

	/*
	 * PLUGINS
	 */

	var _SERVERS = {
		'http':   require('./http.js')
//		'socks5': require('./socks5.js')
	};



	/*
	 * BLACKLIST
	 */

	var _DOMAIN_BLACKLIST = [
		'localhost',
		'localhost.localdomain',
		'broadcasthost'
	];



	/*
	 * CACHE AND STRUCTS
	 */

	var _host_cache = {};
	var _rule_cache = {};

	var _check_request = function(data) {

		var reqhost = data.host || null;
		var reqhref = data.href || null;


		if (_host_cache[reqhost] === true) {

			return true;

		} else {

			var ruleset = _rule_cache[reqhost] || null;
			if (ruleset !== null) {

				var result = _check_ruleset.call(ruleset, reqhref, false);
				if (result === true) {
					return true;
				}

			}

		}


		// GC hints
		ruleset = null;
		result  = null;
		reqhost = null;
		reqhref = null;


		return false;

	};

	var _check_ruleset = function(url, all) {

// TODO: rulesets not implemented yet
return false;

		all = all === true;
		url = typeof url === 'string' ? url : null;


		if (url !== null) {

			// 1. All Regular Expressions must match
			if (all === true) {

				var result = true;

				for (var r = 0, rl = this.length; r < rl; r++) {

					var entry = this[r];
					if (!entry.match(url)) {
						result = false;
						break;
					}

				}


				return result;


			// 2. Only a single Regular Expression must match
			} else {

				var result = false;

				for (var r = 0, rl = this.length; r < rl; r++) {

					var entry = this[r];
					if (entry.match(url)) {
						result = true;
						break;
					}

				}


				return result;

			}

		}


		return false;

	};



	/*
	 * HELPERS
	 */

	var _fs   = require('fs');
	var _path = require('path');

	var _parse_settings = function(data) {

		// Not shared on prototype due to theoretical memleak issues
		var settings = {
			port:     8080,
			root:     null,
			ispublic: false
		};


		if (data instanceof Object) {
			settings.port     = typeof data.port === 'number'   ? (data.port | 0)            : settings.port;
			settings.root     = typeof data.root === 'string'   ? _path.normalize(data.root) : settings.root;
			settings.ispublic = data.ispublic === true;
		}


		return settings;

	};

	var _parse_config = function(url) {

		var that = this;
		var path = _path.normalize(url);


		_fs.exists(path, function(exists) {

			if (exists === true) {

				// 1. JSON config
				var tmp = _path.basename(path).split('.');
				if (tmp[1] === 'json') {

					_fs.readFile(path, function(err, raw) {

						var data = null;
						if (!err) {

							try {
								data = JSON.parse(raw.toString());
							} catch(e) {
								data = null;
								err  = true;
							}

						}


						if (err) {
							console.warn('Invalid JSON file at "' + path + '"');
						} else {
							_parse_json.call(that, data);
						}

					});

				// 2. Hosts config
				} else {

					_fs.readFile(path, function(err, raw) {

						var data = null;
						if (!err) {
							data = raw.toString().split('\n');
						}


						if (err) {
							console.warn('Invalid Hosts file at "' + path + '"');
						} else {
							_parse_hosts.call(that, data);
						}

					});

				}

			} else {
				console.warn('Invalid Config file at "' + path + '"');
			}

		});

	};

	var _parse_json = function(data) {

		// TODO: Parse JSON config with rulesets
		console.log('PARSING JSON NAO');

	};

	var _parse_hosts = function(data) {

		for (var d = 0, dl = data.length; d < dl; d++) {

			var line = data[d].trim();
			if (line.charAt(0) === '#') {
				continue;
			}


			var index = line.indexOf('#');
			if (index !== -1) {
				line = line.substr(0, index).trim();
			}

			var rule = line.split(/\s/g);
			if (rule.length === 2) {

				// Ignore other hosts for security reasons
				if (rule[0] === '127.0.0.1') {

					var domain = rule[1];
					if (_DOMAIN_BLACKLIST.indexOf(domain) === -1) {
						_host_cache[domain] = true;
					}

				}

			}

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	var Proxy = function(data) {

		var settings = _parse_settings(data);


		this.root      = settings.root;
		this.port      = settings.port;
		this.ispublic  = settings.ispublic;


		settings = null;


		// TODO: Implement directory listener
		_parse_config.call(this, this.root + '/hosts.d/goatse_test');

	};


	Proxy.prototype = {

		listen: function(type, port) {

			type = typeof type === 'string' ? type       : null;
			port = typeof port === 'number' ? (port | 0) : null;


			if (
				   type !== null
				&& port !== null
			) {

				var _server = _SERVERS[type];
				if (_server !== undefined) {

					var host = '127.0.0.1';
					if (this.ispublic === true) {
						host = null;
					}


					var result = _server.create(port, host, _check_request, this);
					if (result === true) {

						// TODO: Evaluate if this is bad for potential memory leaks
						//var server = _server.get(port);
						//if (server !== null) {
						//	this.__servers.push(server);
						//}


						return true;

					}

				}

			}


			return false;

var that = this;
setTimeout(function() {
	console.log(that);
}, 1000);

		}

	};



	/*
	 * LIBRARY INTEGRATION
	 */

	module.exports = Proxy;

})(this);
