var exec      = require("child_process").exec,
	url       = require("url"),
	path      = require("path"),
	fs        = require("fs"),
	httpAgent = require("http-agent"),
	jsdom     = require("jsdom");


var html = function(domain, resources, task) {
	var resourcesArray = (typeof resources === "string" ? [resources] : resources);
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