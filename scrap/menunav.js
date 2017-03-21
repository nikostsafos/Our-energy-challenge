$(document).ready(function(){                    
	$(window).scroll(function(){                          
		if ($(this).scrollTop() > 500) {
			$('#nav').fadeIn(500);
		} else {
			$('#nav').fadeOut(500);
		}
	});
})