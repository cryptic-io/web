 
// init event handlers
/*
var dropbox = document.getElementById("upload")
dropbox.addEventListener("dragenter", dragEnter, false);
dropbox.addEventListener("dragleave", dragLeave, false);
dropbox.addEventListener("drop", drop, false);
},2e3)
*/

function dragEnter(e) {
	console.log("dragenter");
	$(this).addClass("dragEnter");
}

function dragLeave(e) {
	console.log("dragleave");
	$(this).removeClass("dragEnter");
}

function drop(e) {
	// Stop some browsers from redirecting on file-drop.
	e.stopPropagation(); 
	e.preventDefault();

    debugger
	$(this).removeClass("dragEnter");
	move();
	// Parse dropped files and stage them for uploading.
	var files = e.dataTransfer.files;
	processFiles(files);
}

$(".open input").change(function(e) {
	var files = $(this).prop("files");
	processFiles(files);
	move();
});

function move() {
	$(".upload").animate({ "height" : 150 }, 300);
	$(".upload-message").animate( { "top" : 90 }, 300);
	$(".upload-status").animate( { "height" : 150 }, 300);
	$(".upload-panel").animate( { "left" : 20 }, 300);
	$(".upload-add-files").animate( { "left" : $(".page").width() - $(".open").width() - 5 }, 300);
	$(".file-table").slideDown(300);
}

function processFiles(files) {
	for (var i = 0, f; f = files[i]; i++) {
		console.log(f);
		var html = "<div class=row> \
								<div><input type=checkbox /></div> \
								<div>" + f.name + "</div> \
								<div>" + convertHumanReadable(f.size) + "</div> \
								<div><div class='progress'><div class=bar style='width: 45%'></div></div></div>";
		$(".file-table").append(html);
	}
}

function convertHumanReadable(fileSizeInBytes) {
	var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];

	for ( var i = -1; fileSizeInBytes > 1024; i++ ) {
		fileSizeInBytes = fileSizeInBytes / 1024;
	}
	return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};
