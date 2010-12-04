# Open Data Scrapper, Javascript Edition

This library provides a small set of scrapping features to be used on top of [node.js](http://nodejs.org/), particularly useful for [Open Data](http://www.opendatafoundation.org/) initiatives. Currently, this library provides:

* HTML scrapping ([jQuery](http://jquery.com)-based)
* PDF scrapping


## Usage

For real life usage scenarios, the `examples` directory contains a small set of demonstrations of the capabilities provided by the *Open Data Scrapper*.

### HTML scrapping

	scrapper.html(domain, pathList, callback)

For HTML scrapping, you are required to pass the following parameters:

* `domain`, the base URL for all scrapping activities
* `pathList`, a list of relative URLs that will be scrapped. *note:* this parameter can be a string (for single URLs)
* `callback`, a callback function that takes one single parameter as a jQuery object (often represented by the `$` symbol)

A small example follows:

	var scrapper = require("../lib/scrapper");
	
	scrapper.html("www.google.com", ["news", "finance"], function($) {
		console.log($("div.content > *").size());
	});

### PDF scrapping

	scrapper.pdf(url, callback)

For PDF scrapping, you are required to pass the following parameters:

* `url`, the URL where the PDF document resides
* `callback`, a callback function that takes one single parameter as a `string` object containing the document's textual data

A small example follows:

	var scrapper = require("../lib/scrapper");
	
	scrapper.pdf("http://www.example.com/document.pdf", function(text) {
		console.log(text);
	});


## Installation

The Open Data Scrapper requires the installation of the following software packages:

### node.js

Follow the installation procedures defined at the [node.js GitHub repository](https://github.com/ry/node). I recommend cloning the repository and compiling directly from the source.

### npm

[npm](https://github.com/isaacs/npm) is the *unofficial* node.js package manager. Once again, clone the repository and compile the source.

### request http-agent htmlparser jsdom

These four libraries are required for the scrapping stub capabilities provided by the *Open Data Scrapper*. To install these libraries, ensure the availability of `npm`:

`type npm`

and then execute the following command (with or without `sudo`, depending on your own environment):

`npm install request http-agent htmlparser jsdom`

### pdftotext

For PDF scrapping, the Open Data Scrapper relies on a small external interface. First, check the availability of `pdftotext` by running the following command:

`type pdftotext`

Most linux distributions provide `pdftotext` off-the-shelf; refer to your distribution documentation on how to install this program (*tip*: it's part of the [Xpdf](http://www.foolabs.com/xpdf/) package).

On OS X, make sure you have [MacPorts](http://www.macports.org/) in your system, and install the `poppler` package, as follows:

`sudo port install poppler`


## Limitations

* HTML scrapping is provided via jQuery 1.4.2. More recent versions of jQuery are still incompatible with underlying scrapping libraries
* The PDF scrapping capabilities are dependent on the (lack of) layout features of each PDF file


## Inspiration

This scrapper is inspired by a blog post entitled [jsdom + jQuery in 5 lines with node.js](http://blog.nodejitsu.com/jsdom-jquery-in-5-lines-on-nodejs).