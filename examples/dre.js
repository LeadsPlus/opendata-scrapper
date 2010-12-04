var scrapper = require("../lib/scrapper"),
	url      = require("url"),
    qs       = require("querystring");


var baseDomain = "www.dre.pt";
var baseURL    = "http://" + baseDomain;

var diplomas = function(tipo, ano, trimestre) {
	var basePath   = "sug/1s/indices-lista-diplomas.asp?";
	var params     = { "tipo": tipo, "ano":  ano, "trim": trimestre };
	var diplomaURL = basePath + qs.stringify(params);
	
	scrapper.html(baseDomain, diplomaURL, function($) {
		$("#centro_wide ul li").each(function(i) {
			var href = url.resolve(baseURL, $("p:first a", this).attr("href"));
			scrapper.pdf("http://www.dre.pt/util/getpdf.asp?s=ind&serie=1&iddr=2010.1S01&iddip=20100011", function(text) {
				dummyParseDiplomasText(text);
			});
		});
	});
};

var dummyParseDiplomasText = function(text) {
	console.log(text);
}

diplomas("decreto-lei", 2010, 1);