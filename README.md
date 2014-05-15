
NodeJS AdBlock Proxy
====================

Using NodeJS and a hosts file to block ad networks and making the interwebz even moar awesome!

# Why using a NodeJS based AdBlock Proxy?

- It's blazing fast. Seriously, forget other Proxy implementations.
- It's written in JavaScript !!!!111eleven.

- With a few hours on Facebook, reddit, stackoverflow, it uses this amount of memory (whilst having over 20k blocked hosts and urls with n rulesets):

![Screenshot #01](./docs/images/screenshot_01.png)


- And yes, 15MB is way less than a couple GB memory usage of an AdBlock Plus Web Browser extension.
- If you still don't believe it, get over it and use something else. I don't care.


# License

This project is released under the WTFPL.
See the LICENSE.md for details.


# Installation

*Note*: You can change the suggested installation folder to whereever you want to install it.
Just make sure you change the paths in the bash commands accordingly.

- Download and install the newest available stable release of NodeJS from [nodejs.org](http://nodejs.org).

- Download this project via [zip-file](https://github.com/LazerUnicorns/nodejs-adblock-proxy/archive/master.zip) and extract its contents to **/opt/adproxy**.

- Navigate to the folder in your Shell (or PowerShell) and execute:

```bash
cd /opt/adproxy; # change if you used a different folder
nodejs start.js 8080; # will start a proxy on (defaulted) port 8080
```

# Features

- HTTP Proxy is implemented
- Support for hosts files

# Work-in-progress

- SOCKS5 Proxy
- Directory listeners for *hosts.d* and *json.d*
- Support for JSON config files
- Support for AdBlock Plus filter rulesets

# Integration

TODO: Documentation about setup of Web Browsers. Contributions welcomed.

