// document.body.innerHTML = '<button class="thisbutton">Page matches ruleset</button>';
// $("body").html("X");

// $(".thisbutton").on("click", function() {
// 	console.log("XXX");
// });

var download_element = '\
	<div class="frame-demolition">\
		<button class="fd-download-button waves-effect waves-light btn pink lighten-3" id="fddownload"><i class="material-icons left"></i>Download All</button>\
		<span class="fd-download-status">notice: your browser will stop responding for up to a minute when downloading</span>\
		<div class="fd-download-loading-bar progress" style="display:none;">\
			<div class="indeterminate"></div>\
		</div>\
	</div>\
';
		// <button class="fd-download-button" id="fddownload">Download all</button>\
$(download_element).appendTo(".detailright");

var jumpto_element = '\
	<button class="fd-jump-to-download-button waves-effect waves-light btn teal lighten-3" id="fdjumptodownload">to download</button>\
';
$(jumpto_element).appendTo('.detailleft');

document.getElementById("fdjumptodownload").addEventListener("click", function() {
	var container = $('html,body');
	var scrollto = $('.fd-download-button');
	container.animate({
		scrollTop: scrollto.offset().top - container.offset().top - 300,
		srollLeft: 0
	}, 300);
});


// $(".frame-demolition").on('click', '.fd-download', function() {
// 	console.log("processing");
// });
var target_element = document.getElementById("fddownload");
target_element.addEventListener("click", function() {
	console.log("OK");
	// show loading bar
	$('.fd-download-loading-bar').fadeIn();
	// begin file downloading and processing
	downloadFile(fileUrls[count], onDownloadComplete);
});


// debug button ---start---
// var debug_element = '<div class="frame-demolition-debug"><button class="fd-debug-button" id="fddebug">Debug</button></div>';
// $(debug_element).appendTo(".detailright");

// var debug_target = document.getElementById("fddebug");
// debug_target.addEventListener("click", function() {
// 	console.log("DEBUG");
// 	var section_list = $('.detailright ol li'), individual_section, section_link, links = [];
// 	for(var i = 0; i < section_list.length; i++) {
// 		individual_section = $('.detailright ol li a:eq(' + i + ')');
// 		section_link = individual_section[0].getAttribute("href");
// 		console.log(section_link);
// 		section_link = section_link.replace("ft_viewer.php?fname=", "");
// 		section_link = "http://dewey.petra.ac.id/repository/jiunkpe/" + section_link;
// 		links.push(section_link);
// 	}
// 	console.log(links);
// });
// debug button ---end---

// direct link example to dewey pdf
// 'http://dewey.petra.ac.id/repository/jiunkpe/jiunkpe/s1/info/2010/jiunkpe-ns-s1-2010-26407079-19762-cosine-cover.pdf', 
// http://dewey.petra.ac.id/repository/jiunkpe/jiunkpe/s1/info/2010/jiunkpe-ns-s1-2010-26407079-19762-cosine-chapter1.pdf


// collecting and parsing pdf links
var section_list = $('.detailright ol li'), individual_section, section_link, links = [];
var extension_regex = /(?:\.([^.]+))?$/;

for(var i = 0; i < section_list.length; i++) {
	// get item list according order
	individual_section = $('.detailright ol li a:eq(' + i + ')');
	// get link value of href
	section_link = individual_section[0].getAttribute("href");
	// console.log(section_link);
	// replace unnecessary string from the link
	var extension = extension_regex.exec(section_link)[1];
	console.log(extension);
	if(extension == "pdf") {
		section_link = section_link.replace("ft_viewer.php?fname=", "");
		// concat path to direct pdf file
		section_link = "http://dewey.petra.ac.id/repository/jiunkpe/" + section_link;
	}
	else if(extension == "jpg") {
		section_link = section_link;
	}
	else {
		section_link = null;
	}
	if(section_link) {
		// append parsed link to array
		links.push(section_link);
	}
}

// var fileUrls = ['http://www.w3schools.com/images/w3schools.png', 'http://dewey.petra.ac.id/repository/jiunkpe/jiunkpe/s1/info/2010/jiunkpe-ns-s1-2010-26407079-19762-cosine-conclusion.pdf', 'http://dewey.petra.ac.id/repository/jiunkpe/jiunkpe/s1/info/2010/jiunkpe-ns-s1-2010-26407079-19762-cosine-chapter1.pdf'];
// var fileUrls = ['http://dewey.petra.ac.id/repository/jiunkpe/jiunkpe/s1/jdkv/2009/jiunkpe-ns-s1-2009-42405108-14162-jasa-extras1.jpg'];
var fileUrls = links;
var zip = new JSZip();
var count = 0;

// downloadFile(fileUrls[count], onDownloadComplete);

function downloadFile(url, onSuccess) {
	console.log("downloading file");
	// change status
	var downloading_file_name = fileUrls[count].substring(fileUrls[count].lastIndexOf('/') + 1);
	$('.fd-download-status').text("downloading " + downloading_file_name + " ...");

	// with native xhr
	// var xhr = new XMLHttpRequest();
	// // xhr.onprogress = calculateAndUpdateProgress();
	// xhr.open("GET", url, true);
	// // xhr.responseType = 'blob';
	// xhr.responseType = 'arrayBuffer';
	// xhr.onreadystatechange = function() {
	// 	console.log(xhr.readyState);
	// 	if(xhr.readyState == 4) {
	// 		if(onSuccess) {
	// 			console.log("XHR RESOPNSE", xhr.response);
	// 			// var blob = new Blob(xhr.response, {type: "application/pdf"});
	// 			onSuccess(xhr.response);
	// 			// onSuccess(blob);
	// 			// console.log("BLOB", blob);
	// 		}
	// 	}
	// }
	// // xhr.onload = function(event) {
	// // 	var blob = xhr.response;
	// // 	console.log(blob);
	// // }
	// xhr.send();

	// with jquery
	// var request = $.ajax({
	// 	url: url,
	// 	type: "GET",
	// 	contentType: "application/pdf",
	// 	mimeType: 'text/plain; charset-x-user-defined',
	// });

	// request.done(function(data) {
	// 	console.log("JQUERY XHR RESPONSE", data);
	// 	onSuccess(data);
	// });


	// with jszip-util
	JSZipUtils.getBinaryContent(url, function(error, data) {
		if(error) {
			console.log("ERROR", error);
		}
		else {
			// console.log("DATA", data);
			onSuccess(data);
		}
	});
}

function onDownloadComplete(blobData) {
	console.log("download complete");
	if(count < fileUrls.length) {
		console.log("Count OK");
		blobToBase64(blobData, function(binaryData) {
			// determine name of the file to be added
			var fileName = fileUrls[count].substring(fileUrls[count].lastIndexOf('/') + 1);
			console.log("FILENAME", fileName);
			// add file to zip (append)
			zip.file(fileName, binaryData, {binary: true});
			// zip.file(fileName, binaryData);
			if(count < fileUrls.length - 1) {
				count++;
				downloadFile(fileUrls[count], onDownloadComplete);
			}
			else {
				// all files finished download
				// ready to zip
				console.log("ready to zip");
				// change downloding status
				$('.fd-download-status').text("processing PDFs... please wait until browser is responding again (up to a minute)");
				// genereate the zip of appended files and put in inside a variable
				var content = zip.generate();

				var zipName = "download.zip";
				// console.log("content after generate", content);
				// location.href = "data:application/zip;base64," + content;

				// change downloading status
				$('.fd-download-status').text("sweet!");
				// hide downlod loading bar
				$('.fd-download-loading-bar').fadeOut();

				// return count to 0
				count = 0;

				// simulate download action towards generated zip of which instance temporarily attached to document
				var link = document.createElement('a');
				link.download = zipName;
				link.href = "data:application/zip;base64," + content;
				console.log("A", link);
				document.body.appendChild(link);
				link.click();
				console.log("save ok");
				document.body.removeChild(link);
				delete link;
			}
		});
	}
}

function blobToBase64(blob, callback) {
	// toggling false for pdf doesn't need conversion as of arrayBuffer
	var toggle = false;
	if(toggle) {
		console.log("converting blob to base64");
		var reader = new FileReader();
		reader.onload = function() {
			var dataUrl = reader.result;
			var base64 = dataUrl.split(',')[1];
			callback(base64);
		};
		reader.readAsDataURL(blob);
	}
	else {
		console.log("skip base64 conversion");
		callback(blob);
	}
}

function calculateAndUpdateProgress(evt) {
	if(evt.lengthComputable) {
		console.log("evt");
	}
}

// parse dewey description text
var detailright_text = $(".detailright p").text();
$(".detailright p").html(detailright_text);