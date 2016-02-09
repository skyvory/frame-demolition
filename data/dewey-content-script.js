// document.body.innerHTML = '<button class="thisbutton">Page matches ruleset</button>';
// $("body").html("X");

// $(".thisbutton").on("click", function() {
// 	console.log("XXX");
// });

var download_element = '<div class="frame-demolition"><button class="fd-download-button" id="fddownload">Download all</button></div>';
$(download_element).appendTo(".detailright");

// $(".frame-demolition").on('click', '.fd-download', function() {
// 	console.log("processing");
// });
var target_element = document.getElementById("fddownload");
target_element.addEventListener("click", function() {
	console.log("OK");
	downloadFile(fileUrls[count], onDownloadComplete);
});


// dll link http://dewey.petra.ac.id/repository/jiunkpe/jiunkpe/s1/info/2010/jiunkpe-ns-s1-2010-26407079-19762-cosine-chapter1.pdf

// 'http://dewey.petra.ac.id/repository/jiunkpe/jiunkpe/s1/info/2010/jiunkpe-ns-s1-2010-26407079-19762-cosine-cover.pdf', 

// var fileUrls = ['http://www.w3schools.com/images/w3schools.png'];
var fileUrls = ['http://dewey.petra.ac.id/repository/jiunkpe/jiunkpe/s1/info/2010/jiunkpe-ns-s1-2010-26407079-19762-cosine-conclusion.pdf'];
var zip = new JSZip();
var count = 0;

// downloadFile(fileUrls[count], onDownloadComplete);

function downloadFile(url, onSuccess) {
	console.log("downloading file");
	var xhr = new XMLHttpRequest();
	// xhr.onprogress = calculateAndUpdateProgress();
	xhr.open("GET", url, true);
	// xhr.responseType = 'blob';
	xhr.responseType = 'arrayBuffer';
	xhr.onreadystatechange = function() {
		console.log(xhr.readyState);
		if(xhr.readyState == 4) {
			if(onSuccess) {
				console.log("XHR RESOPNSE", xhr.response);
				// var blob = new Blob(xhr.response, {type: "application/pdf"});
				onSuccess(xhr.response);
				// onSuccess(blob);
				// console.log("BLOB", blob);
			}
		}
	}
	// xhr.onload = function(event) {
	// 	var blob = xhr.response;
	// 	console.log(blob);
	// }
	xhr.send();

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
}

function onDownloadComplete(blobData) {
	console.log("download complete");
	if(count < fileUrls.length) {
		console.log("Count OK");
		blobToBase64(blobData, function(binaryData) {
			// add file to zip
			var fileName = fileUrls[count].substring(fileUrls[count].lastIndexOf('/') + 1);
			console.log("FILENAME", fileName);
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

				var content = zip.generate();

				var zipName = "download.zip";
				console.log("content after generate", content);
				// location.href = "data:application/zip;base64," + content;

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