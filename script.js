function z() {
				var lockedToBottom = true;
			    var tdiv = $("#textb");
			    tdiv.on('scroll', function() {
			        if (tdiv.prop('scrollHeight') - tdiv.prop('clientHeight') - tdiv.scrollTop() === 0)
			            lockedToBottom = true;
			        else
			            lockedToBottom = false;
			    });
    		if (lockedToBottom) {
        	    tdiv.scrollTop(tdiv.prop('scrollHeight'));
        	}
        }
					slide();
			function r() { // random
				return Math.floor(Math.random() * 49 + 1);
			}
			function slide(){
				$('body')
				.css('background-image','url("'+ 'http://im.clubcoder.tk/backgrounds/' + r() + '.jpg' +'")')
				.fadeIn(300000,function(){
					setTimeout(slide,300000);
				});
			}
			var fb = new Firebase("https://ccim2.firebaseio.com/");
			var doc = jQuery(document);
			doc.ready(setup);
			function fulltime() {
				var year = new Date();
				var month = new Date();
				var day = new Date();
				var hour = new Date();
				var minute = new Date();
				var fulltime = month.getMonth()+1 + "/" + day.getDate() + "/" + year.getFullYear() + "  " + hour.getHours() + ":" + minute.getMinutes() + " ";
			}
			function setup() {
				$('#message').scrollTop($('#message')[0].scrollHeight)
				var button;
				button = jQuery("#submit");
				button.click(send);
				fb.on("child_added", received);

			}
			function received(message) {
				var head ;
				head = jQuery("#message");
				head.append("<p>" + message.val() + "</p>");
				z()
			}
			function send() {
				var id = "Ian:"
				var input;
				input = jQuery("#text");
				var message = input.val();
				if (message.indexOf("/") === 0) {
					runCommand(message);
				} else {
					
					var topush = fulltime() + id + message;
					fb.push(topush);
				}
				$('#text').val('');
			}