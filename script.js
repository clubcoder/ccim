
                     if (window.location.hash === "#popout") {
                        $(".popout-hidden").hide()
                        $(".intro").html("CCIM")
                        $("#message").css('height','45%')
                        $("#text").css("height", "auto")

                    }

                    $("#logout").click(function(){
                        var fbref = new Firebase("https://ccim2.firebaseio.com")
                        fbref.unauth();
                        localStorage.setItem("auth", "false");
                        window.location.href = "/logout.html"
                    })
                    $(document).ready(function(){$('#message').scrollTop($('#message')[0].scrollHeight);});
                    slide();
			function randoms() { // random
				return Math.floor(Math.random() * 50 + 1);
			}
            $("#help").click(function(){$("#myModal").modal("show")})
			function slide(){
                var z = randoms()
                $('body')
                .css('background-image','url("'+ 'http://im.clubcoder.tk/backgrounds/' + z + '.jpg' +'")')
                .fadeIn(300000,function(){
                 setTimeout(slide,300000);
             });
                $("#view-image").attr("href", 'http://im.clubcoder.tk/backgrounds/' + z + '.jpg')
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
                    var h = hour.getHours() -12
                    var a = " A.M."
                } else {
                    var h = hour.getHours()
                    var a = " P.M."
                }
                if (minute.getMinutes().length === 1) {
                    var m = "0" + minute.getMinutes();
                } else {
                    var m = minute.getMinutes();
                }
                var fulltime = month.getMonth()+1 + "/" + day.getDate() + "/" + year.getFullYear() + "  " + h + ":" + m + a + " ";
                return fulltime;
            }
            function setup() {
                $('#message').scrollTop($('#message')[0].scrollHeight)
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
                var x = window.open('/#popout', 'test', 'status=no,location=no,toolbar=no,menubar=no,width=300,height=500')
            }
            function received(message) {
                var head;
                head = jQuery("#message");
                var m = message.val()
                    console.log("private:" + m)
                    var command = m.substring(1, m.indexOf("/header/") );

                    var other = m.substring(m.indexOf("/header/") + 8, m.indexOf("/end/"))
                    var note = m.substring(m.indexOf("/end/") + 5)
                    console.log("command: " + command + " other: " + other + " note: " + note)
                    if (command === "after") {
                        $('#message').scrollTop($('#message')[0].scrollHeight)
                    } else if (command === "private"){
                        if (note.indexOf(localStorage.getItem("username")) > -1 ) {
                            head.append("<p>" + note + "</p>");
                            console.log("to you")
                        } else {
                            console.log("fail")
                        }
                    } else if (command === localStorage.getItem("username") ) {
                        head.append('<p class="me"> ' + note + '</p>')
                    } else {
                        //<div class="talk-bubble tri-right btm-left"> <div class="talktext"> <p>
                        head.append('<p>' + note + '</p>')
                    }
                    
            }
            $(document).keypress(function(e) {
                if(e.which == 13) {
                    s()
                    return false;
                    e.preventDefualt;
                }
            });
            function runCommand(c) {
                var id = localStorage.getItem("username")
                var command = c.substring(c.indexOf("/") + 1, c.indexOf("["))
                console.log(command)
                if (command === "msg") {
                    var recipents = c.substring(c.indexOf("/msg[") + 5, c.indexOf("]"))
                    var message = c.substring(c.indexOf("] ") + 2)
                    var topush = "/private/header/" + recipents + "/end/" + fulltime() + id + " to " + recipents.replaceAll(" ", " and ").replaceAll(" i", " I").replaceAll(" j", " J").replaceAll(" d", "D").replaceAll(" l", " L") + ": " + message;
                     fb.push(topush);
                     $('#text').val('');

                }

            }
            function s() {
                var id = localStorage.getItem("username")
                var input;
                input = jQuery("#text");
                var message = convertToHtml(input.val().replaceAll("<", "&lt;").replaceAll(">", "&gt;") ).replaceAll("<p>", " ").replaceAll("</p>", " ");
                if (message.indexOf("/") === 0) {
                 runCommand(message);
                 $('#text').val('');
             } else if (message === null || message === "" || message === " " || message === "\n") {
                return;
            } else {

              topush = '/' + localStorage.getItem(username) + '/message/end/' + fulltime() + id + ": " + message;
             fb.push(topush);
             $('#text').val('');
         }


     }