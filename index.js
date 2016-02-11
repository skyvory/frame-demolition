var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
	id: "mozilla-link",
	label: "Open dewey",
	icon: {
		"16": "./icon-16.ico",
		"32": "./icon-32.ico",
		"64": "./icon-64.ico"
	},
	onClick: handleClick
});

function handleClick(state) {
	// tabs.open("http://dewey.petra.ac.id/catalog/ft_detail.php?knokat=19762");
	// tabs.open("http://dewey.petra.ac.id/catalog/ft_detail.php?knokat=14162");
	tabs.open("http://dewey.petra.ac.id/catalog/ft.php");
	// console.log(tabs.activeTab.url);
}

var pageMod = require("sdk/page-mod");

var self = require('sdk/self');

var data = require('sdk/self').data;

pageMod.PageMod({
	include: "http://dewey.petra.ac.id/catalog/ft_detail.php*",
	contentScriptFile: [data.url("jquery-1.12.0.min.js"), data.url("jszip.min.js"), data.url("jszip-utils.min.js"), data.url("materialize/js/materialize.min.js"), "./dewey-content-script.js"],
	contentStyleFile: [data.url("materialize/css/materialize.min.css"), "./dewey-style.css"],
});
