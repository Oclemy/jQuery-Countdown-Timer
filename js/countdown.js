/**
 * The below function is defined as IIFE(Immediately Invoked Function Expression)
 * That's why it's wrapped in braces and followed by braces for executing the
 * funstion. However it's also taking jquery as a parameter.
 */
(function ( $ ) {
	//Note that $ in jQuery referes to jQuery object. It's a syntactic sugar
	function pad(n) {
	    return (n < 10) ? ("0" + n) : n;
	}

	//Now beow we are assigning function as a parameter.
	$.fn.showclock = function() {

	    var currentDate=new Date();
	    var fieldDate=$(this).data('date').split('-');
		var fieldTime=[0,0];

	    if($(this).data('time') != undefined)
	    	fieldTime=$(this).data('time').split(':');
	   		var futureDate=new Date(fieldDate[0],fieldDate[1]-1,fieldDate[2],fieldTime[0],fieldTime[1]);
	    	var seconds=futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

	    if(seconds<=0 || isNaN(seconds)){
	    	this.hide();
	    	return this;
	    }

		//floor returns the greatest integer less than or equal to its numeric argument.
	    var days=Math.floor(seconds/86400);
	    seconds=seconds%86400;

	    var hours=Math.floor(seconds/3600);
	    seconds=seconds%3600;

	    var minutes=Math.floor(seconds/60);
	    seconds=Math.floor(seconds%60);

	    var html="";

	    if(days!=0){
		    html+="<div class='countdown-container days'>"
		    	html+="<span class='countdown-heading days-top'>Days</span>";
		    	html+="<span class='countdown-value days-bottom'>"+pad(days)+"</span>";
		    html+="</div>";
		}

	    html+="<div class='countdown-container hours'>"
	    	html+="<span class='countdown-heading hours-top'>Hours</span>";
	    	html+="<span class='countdown-value hours-bottom'>"+pad(hours)+"</span>";
	    html+="</div>";

	    html+="<div class='countdown-container minutes'>"
	    	html+="<span class='countdown-heading minutes-top'>Minutes</span>";
	    	html+="<span class='countdown-value minutes-bottom'>"+pad(minutes)+"</span>";
	    html+="</div>";

	    html+="<div class='countdown-container seconds'>"
	    	html+="<span class='countdown-heading seconds-top'>Seconds</span>";
	    	html+="<span class='countdown-value seconds-bottom'>"+pad(seconds)+"</span>";
	    html+="</div>";

	    this.html(html);
	};

	//create a function and assign it as to our countdown
	$.fn.countdown = function() {
		var el=$(this);
		el.showclock();
		setInterval(function(){
			el.showclock();
		},1000);

	}
//Our IIFE is executed beow with jQuery passed as a parameter,
}(jQuery));

//ready() function is how jQuery detects that the DOM is ready or loaded completely
jQuery(document).ready(function(){
	if(jQuery(".countdown").length > 0){

		//jquery.each iterates over jQuery object while allowing us execute a
		//function
		jQuery(".countdown").each(function(){
			jQuery(this).countdown();
		})

	}
})
//end