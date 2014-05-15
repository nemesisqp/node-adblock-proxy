


(function(global) {

	/*
	 * CACHE AND STRUCTS
	 */

	var _cache = {};



	/*
	 * HELPERS
	 */

	var _http  = require('http');
	var _url   = require('url');



	/*
	 * LIBRARY INTEGRATION
	 */

	module.exports = {

		create: function(port, host, callback, scope) {

			host     = typeof host === 'string'       ? host       : null;
			port     = typeof port === 'number'       ? (port | 0) : null;
			callback = typeof callback === 'function' ? callback   : function() { return false; };
			scope    = typeof scope !== 'undefined'   ? scope      : this;


			if (port !== null) {

				var server = new _http.Server();

				server.on('request', function(request, response) {

					var options = _url.parse(request.url);

					var data = {
						host: options.host,
						href: options.href
					};


					var isblocked = callback.call(scope, data);
					if (isblocked === true) {

						var header = {
							'Content-Length': 31
						};

						response.writeHead(410, header);
						response.write('Blocked by NodeJS AdBlock Proxy');
						response.end();

					} else {

						request.pause();

						var connector = _http.request(options, function(targetresponse) {

							targetresponse.pause();
							response.writeHead(targetresponse.statusCode, targetresponse.headers);
							targetresponse.pipe(response);
							targetresponse.resume();

						});

						request.pipe(connector);
						request.resume();

					}


					// GC hints
					options   = null;
					data      = null;
					isblocked = null;
					connector = null;

				});

				server.on('error', function(err) {
					console.error('ERROR "' + err + '" on port ' + port);
				});


				if (host !== null) {
					server.listen(port, host);
				} else {
					server.listen(port);
				}

			}

		},

		get: function(port) {
			return _cache[port] || null;
		}

	};

})(this);

