
	"use strict";
$()
// bug testing
if (window.location.hash === "#popout") {
	$(".popout-hidden").hide();
	$(".intro").html("CCIM");
	$("#message").css('height','45%');
	$("#text").css("height", "auto");

}

$("#logout").click(function(){
	var fbref = new Firebase("https://ccim2.firebaseio.com");
	fbref.unauth();
	sessionStorage.setItem("sessionKey", "false");
	localStorage.setItem("auth", "false");
	sessionStorage.setItem("auth", "false");
	window.location.href = "logout.html"; 
});
$(document).ready(function(){$('#message').scrollTop($('#message')[0].scrollHeight);});
slide();
function randoms() { // random
	return Math.floor(Math.random() * 50 + 1);
}
$("#help").click(function(){$("#myModal").modal("show");});
function slide(){
	var z = randoms();
	$('body')
	.css('background-image','url("'+ '/backgrounds/' + z + '.jpg' +'")')
	.fadeIn(300000,function(){
		setTimeout(slide,300000);
	});
	$("#view-image").attr("href", '/backgrounds/' + z + '.jpg');
}
var fb = new Firebase("https://ccim2.firebaseio.com/messages/");
var doc = jQuery(document);
doc.ready(setup);
function fulltime() {
	var year = new Date();
	var month = new Date();
	var day = new Date();
	var hour = new Date();
	var minute = new Date();
	if (hour.getHours() > 12 ) {
		var h = hour.getHours() -12;
		var a = " P.M.";
	} else {
		var h = hour.getHours();
		var a = " A.M.";
	}
	if (String(minute.getMinutes()).length === 1) {
		var m = "0" + String(minute.getMinutes());
	} else {
		var m = minute.getMinutes();
	}
	var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var month = month[d.getMonth()];
	var fulltime = month + " " + day.getDate() + ", " + year.getFullYear() + "  at " + h + ":" + m + a + " ";
	return fulltime;
}
function setup() {
	$('#message').scrollTop($('#message')[0].scrollHeight);
	var button;
	button = jQuery("#submit");
	button.click(s);
	$("#popout").click(popout);
	fb.on("child_added", received);


}
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};
function popout() {
	var x = window.open('/#popout', 'test', 'status=no,location=no,toolbar=no,menubar=no,width=300,height=500');
}
function received(message) {
	var head;
	head = jQuery("#message");
	var m = message.val();
	if (m.indexOf("/") === 0) {
		console.log("private:" + m);
		var command = m.substring(1, m.indexOf("/header/") );

		var other = m.substring(m.indexOf("/header/") + 8, m.indexOf("/end/"));
		var note = m.substring(m.indexOf("/end/") + 5);
		console.log("command: " + command + " other: " + other + " note: " + note);
		if (command === "after") {
			$('#message').scrollTop($('#message')[0].scrollHeight);
		} else if (command === "private"){
			if (note.toLowerCase().indexOf(localStorage.getItem("username").toLowerCase()) > -1 ) {
				head.append("<p>" + note + "</p>");
				if ($('#autoscroll').prop('checked') ) {
					$('#message').scrollTop($('#message')[0].scrollHeight);

				}

			}
		}
	} else {
			head.append('<p>' + m + '</p>');
			if ($('#autoscroll').prop('checked') ) {
				$('#message').scrollTop($('#message')[0].scrollHeight);

			}

		}
}


$('textarea').keyup(function (event) {
	function getCaret(el) { 
    if (el.selectionStart) { 
        return el.selectionStart; 
    } else if (document.selection) { 
        el.focus();
        var r = document.selection.createRange(); 
        if (r == null) { 
            return 0;
        }
        var re = el.createTextRange(), rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);
        return rc.text.length;
    }  
    return 0; 
}
    if (event.keyCode == 13) {
        var content = this.value;  
        var caret = getCaret(this);          
        if(event.shiftKey){
            this.value = content.substring(0, caret - 1) + "\n" + content.substring(caret, content.length);
            event.stopPropagation();
        } else {
            this.value = content.substring(0, caret - 1) + content.substring(caret, content.length);
            s();

        }
    }
});
function runCommand(c) {
	var id = localStorage.getItem("username");
	var command = c.substring(c.indexOf("/") + 1, c.indexOf("["));
	console.log(command);
	console.log(2);
	if (command === "msg") {
		var recipents = c.substring(c.indexOf("/msg[") + 5, c.indexOf("]"));
		var message = c.substring(c.indexOf("] ") + 2);
		var topush = "/private/header/" + recipents + "/end/" + fulltime() + "Private message from " + id + " to " + recipents.replaceAll(" ", " and ").replaceAll(" i", " I").replaceAll(" j", " J").replaceAll(" d", "D").replaceAll(" l", " L").replaceAll(localStorage.getItem("username")) + ": " + message;
		fb.push(topush);
		$('#text').val('');
		console.log(4)

	}
	console.log(10)

}
function s() {
	var id = localStorage.getItem("username");
	var input;
	input = jQuery("#text");
	//
	console.log(input.val());
	var message = convertToHtml(input.val().replaceAll("<", "&lt;").replaceAll(">", "&gt;") ).replaceAll("<p>", " ").replaceAll("</p>", " ");

	console.log(message);
	if (message.indexOf("/") === 0 || message.indexOf(" /") === 0) {
		console.log(3);
		runCommand(message);
		console.log(4);
		$('#text').val('');
	} else if (message === null || message === "" || message === " " || message === "\n") {
		return;
	} else {
		console.log("normal");
		var topush = fulltime() + id + ": " + message;
		fb.push(topush);
		$('#text').val('');
	}


}
// when .modal-wide opened, set content-body height based on browser height; 200 is appx height of modal padding, modal title and button bar

$(".modal-wide").on("show.bs.modal", function() {
  var height = $(window).height() - 200;
  $(this).find(".modal-body").css("max-height", height);
});
