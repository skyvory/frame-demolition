// document.body.innerHTML = '<button class="thisbutton">Page matches ruleset</button>';
// $("body").html("X");

// $(".thisbutton").on("click", function() {
// 	console.log("XXX");
// });

var download_element = '<button class="fd-download-button">Download all</button>';
$(download_element).appendTo(".detailright");

$(".fd-download").on('click', function() {
	console.log("processing");
});