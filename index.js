var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
	tabs.open("http://dewey.petra.ac.id/catalog/ft_detail.php?knokat=19762");
	// console.log(tabs.activeTab.url);

}

// show content of tab in console
// tabs.on('activate', function(tab) {
// 	console.log('active: ' + tabs.activeTab.url);
// 	var worker = tab.attach({
// 		contentScript: 'self.port.emit("html", document.body.innerHTML);'
// 	});
// 	worker.port.on("html", function(message) {
// 		console.log(message);
// 	});
// });

var pageMod = require("sdk/page-mod");

var self = require('sdk/self');

var data = require('sdk/self').data;

pageMod.PageMod({
	include: "http://dewey.petra.ac.id/catalog/*",
	contentScriptFile: [data.url("jquery-1.12.0.min.js"), data.url("jszip.min.js"), data.url("FileSaver.min.js"), "./dewey-content-script.js"],
	// contentStyleFile: "./dewey-style.css",
});

// var { attach, detach } = require('sdk/content/mod');
// var { style } = require('sdk/stylesheet/style');
// var { ToggleButton } = require('sdk/ui/button/toggle');

// var style = Style({
// 	uri: './style.css'
// });

// var button = ToggleButton({
// 	id: "styleist",
// 	label: "stylist",
// 	icon: "./icon-16.png",
// 	onChange: function(state) {
// 		if(state.checked) {
// 			attach(style, tabs.activeTab);
// 		}
// 		else {
// 			detach(style, tabs.activeTab);
// 		}
// 	}
// });