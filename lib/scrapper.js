var exec      = require("child_process").exec,
	url       = require("url"),
	path      = require("path"),
	fs        = require("fs"),
	httpAgent = require("http-agent"),
	jsdom     = require("jsdom");


var html = function(domain, resources, task) {
	var resourcesArray = (typeof resources === "string" ? [resources] : resources);
	var options = [];
	
	for (resource in resourcesArray) {
		options.push({
			uri: resourcesArray[resource],
			headers: {
				"Accept":"application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
				"Cache-Control":"max-age=0",
				"Referer":"http://www.dre.pt/",
				"User-Agent":"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7"
			}
		});
	}
	
	var agent = httpAgent.create(domain, resourcesArray);
	
	agent.addListener("next", function(err, ag) {
		jsdom.jQueryify(jsdom.jsdom(ag.body).createWindow(), "../contrib/jquery-1.4.2.min.js", function(window, $) {
			task($);
		});
	});
		
	agent.addListener("stop", function(err, ag) {
		
	});
	
	agent.start();
};

var pdf = function(pdfurl, callback) {
	var date  = (new Date()).valueOf();
	var pdffn = path.basename(url.parse(pdfurl).pathname) + "-" + date + ".pdf";
	var txtfn = path.basename(pdffn, ".pdf") + ".txt";
	exec("curl -L '" + pdfurl + "' > " + pdffn, function(err, stdout, stderr) {
		exec("pdftotext -enc UTF-8 " + pdffn + " " + txtfn, function(err, stdout, stderr) {
			callback(fs.readFileSync(txtfn, "UTF-8"));
		});
	});
};


exports.html = html;
exports.pdf = pdf;