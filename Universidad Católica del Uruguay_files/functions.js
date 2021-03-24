jQuery(document).ready(function() {

	greyInitRedux();
	ieDropdownsNav();
	ieDropdownsFilter();
	itemViewer();
	jsTabsetInit();
	slider( true );
	headerTabs();
	carousel();
	emergencyClose();
	adjournLinks();
	zebra_strip_rows();
	visitor_site_slideshow();
	utilDropDownMobile();
 });

var carousel_round = 0;

/*-------------------------------------------
 	Grey Initial Values
-------------------------------------------*/
function greyInitRedux() {
	jQuery("input.filled, textarea.filled").focus(function(e){
		if(this.value == this.defaultValue)
		{
			jQuery(this).removeClass('filled');
			 this.value= '';
		}
		jQuery(this).blur(function(f){
			if(this.value == this.defaultValue) {
				jQuery(this).addClass('filled');
				} else if(this.value == "") {
					this.value = this.defaultValue;
					jQuery(this).addClass('filled');
				}
			});
	})

}

/*-------------------------------------------
 	IE6 CSS Main Nav Dropdowns
-------------------------------------------*/
function ieDropdownsNav() {
	if(document.all&&document.getElementById)
	{
		navRoot = document.getElementById('main-nav');
		if (!navRoot) { return false; }

		for(i=0; i<navRoot.childNodes.length; i++)
		{
			node = navRoot.childNodes[i];
			if (node.nodeName=='LI')
			{
				node.onmouseover=function()
				{
					this.className+=' over';
				}
				node.onmouseout=function()
				{
					this.className=this.className.replace(' over', '');
				}
			}
		}
	}
}


/*-------------------------------------------
 	IE6 CSS Main Nav Dropdowns
-------------------------------------------*/
function ieDropdownsFilter() {
	if(document.all&&document.getElementById)
	{
		navRoot = document.getElementById('filter-drop');
		if (!navRoot) { return false; }

		for(i=0; i<navRoot.childNodes.length; i++)
		{
			node = navRoot.childNodes[i];
			if (node.nodeName=='DIV')
			{
				node.onmouseover=function()
				{
					this.className+=' over';
				}
				node.onmouseout=function()
				{
					this.className=this.className.replace(' over', '');
				}
			}
		}
	}
}




/*-------------------------------------------
 	View More
-------------------------------------------*/
function itemViewer() {
	//jQuery(document).delegate('#filter-drop a, .expandable > .load, .filter-nav a', 'click', function (e)
	//jQuery(document).delegate('.expandable > .load, .filter-nav a', 'click', function (e)
	jQuery(document).delegate('.filter-nav a', 'click', function (e)
	{
		// get the src for the content we're trying to view
		var dataSrc = jQuery(this).attr('data-src');

		// determine whether we're trying to sort the existing view
		if(jQuery(this).attr('data-sort')) {
			var dataSort = jQuery(this).attr('data-sort');
		} else {
			var dataSort = jQuery('.filter-nav > li > a').attr('data-sort');
		}

		// how many items do we have?
		var itemOffset = jQuery('.expandable .listing > li').size();

		//find out if we clicked the menu, if so, clear out everything and add data attribute to the load more
		if(jQuery(this).closest('div').hasClass("filter"))
		{
			var hiddenDiv = jQuery('<div />', {
				"class": "items hidden spacer",
				"height": jQuery('.expandable').outerHeight()
			});
			jQuery('.expandable > .load').before(hiddenDiv);

			jQuery('.expandable > ul, .expandable > div:not(.spacer)').remove();
			jQuery('.load').attr('data-src',dataSrc);

			// Change Class of Dropdown Toggle
			var clickedClass = jQuery(this).parent().attr('class');
			jQuery("#filter-drop strong").removeClass().addClass(clickedClass);

			// Change Text of Dropdown Toggle
			var thisLabel = jQuery(this).text();
			jQuery("#filter-drop strong span").text(thisLabel);

			// Grab datasrc from clicked-on menu item and populate the filters with it
			jQuery('.filter-nav a').attr('data-src' , dataSrc);
			jQuery('.filter-nav li').removeClass('active');
			jQuery('.filter-nav > li').eq(0).addClass('active');
		}

		//find out if we clicked the filter nav, if so let's switch the active class
		if(jQuery(this).closest('ul').hasClass("filter-nav")) {
			jQuery('.filter-nav li').removeClass('active');
			jQuery(this).parent().addClass('active');

			//Also let's remove all the items before replacing them with what we want
			var hiddenDiv = jQuery('<div />', {
				"class": "items hidden spacer",
				"height": jQuery('.expandable').outerHeight()
			});
			jQuery('.expandable > .load').before(hiddenDiv);

			jQuery('.expandable > ul, .expandable > div:not(.spacer)').remove();
		}

		jQuery.get(dataSrc, { offset: itemOffset, sort: dataSort }, function(data) {
			jQuery('.expandable .spacer').remove();
			var hiddenDiv = jQuery('<div class="items hidden"></div>');
			jQuery('.expandable > .load').before(hiddenDiv);
			jQuery(hiddenDiv).append(data).hide().removeClass("hidden").fadeIn();
		});

		e.preventDefault();
	});
}


function jsTabsetInit() {
	var $tabset = jQuery('.action-footer .heading-tabset').eq(0);

	var $tablist = jQuery('<ul />', {"class": "heading-tab"});
	$tabset.prepend($tablist);

	jQuery('.action-footer div.heading-tab h3').each(function()
	{
		var $anchor = jQuery('<a />', {
			"class": jQuery(this).attr('class'),
			"onClick":  '_gaq.push([\'_trackEvent\', \'Connect\', \'Click\', \'Head'+jQuery(this).attr('class')+'\', 3]);',
			"href": "#",
			"html": jQuery(this).html()
		});
		var $li = jQuery('<li />');
		$li.append($anchor);
		$tablist.append($li);
	});

	jQuery('.action-footer div.heading-tab').remove();

	jQuery('.action-footer .heading-tabset:gt(0)').each(function()
	{
		$tabset.append(jQuery(this).find('.listing'));
		jQuery(this).remove();
	});
}


function slider( clickEvent ) {
	jQuery('.action-footer .slider').each(function()
	{
		// As we loop through the slider items we'll document the tallest one and the left position
		// of each element
		var maxHeight = 0, lastWidth = 0;

		// grab the slider and make sure the overflow is hidden and it has a defined width
		var $slider = jQuery(this);
		$slider.css('width', $slider.outerWidth());
		$slider.css('position', 'relative');
		$slider.css('overflow', 'hidden');

		// store the index (or the currently "selected" slide)
		$slider.prop('index', 0);

		// loop through each of the direct children
		$slider.find('> *').each(function()
		{
			// localize the child as a jQuery object
			var $li = jQuery(this);

			// if this is the tallest child, document it
			if ($li.outerHeight() > maxHeight)
			{
				maxHeight = $li.outerHeight();
			}

			// position each child to the immediate right of its preceding sibling
			$li.css('position', 'absolute');
			$li.css('top', 0);
			$li.css('left', lastWidth);

			// update our maths so we know where to place the next sibling
			lastWidth+= $li.outerWidth();
		});

		// set the height of the slider based on the tallest child
		//$slider.css('height', maxHeight);

		// build the previous control button and store a reference to its related slider
		var $previous = jQuery('<a />', {"class": "prev disabled", "href": "#", "text": "Previous"});
		$previous.prop('slider', $slider);

		// build the next control button and store a reference to its related slider
		var $next = jQuery('<a />', {"class": "next", "href": "#", "text": "Next"});
		$next.prop('slider', $slider);

		// build the controls div and add it to the markup
		var $controls = jQuery('<div />', {"class": "controls"}).append($previous).append($next);
		$slider.after($controls);
		$slider.prop('controls', $controls);
	});

	// watch for clicks on the controls
	if ( clickEvent ) {
	jQuery(document).delegate('.listing + .controls .prev, .listing + .controls .next', 'click', function (event)
	{
		// stop our clicks from affecting the browser/url
		event.preventDefault();

		// localize a jQuery version of the clicked link
		var $anchor = jQuery(this);

		// grab the slider, that we previously stored while creating these links
		var $slider = $anchor.prop('slider');

		// localize the index for prettier code
		var focusedIndex = $slider.prop('index');
		if ( !focusedIndex ) {
			focusedIndex = 0;
		}

		// determine what slide is focused
		var $focus = $slider.find('> *').eq(focusedIndex);

		// grab the width of that focused slide
		var widthDelta = $focus.outerWidth();

		// if we clicked the next button we're moving to the left (negative values, so
		// multiply by -1).
		if ($anchor.hasClass('next'))
		{
			widthDelta *= -1;
		}

		focusedIndex += ($anchor.hasClass('next')) ? 1 : -1;

		// check that the upcoming movement won't push the first element too far to the right
		// leaving whitespace before the element
		if ($slider.find('> *').eq(0).position().left + widthDelta > 0)
		{
			return true;
		}

		// check that the upcoming movement won't push the last element too far to the left
		// leaving whitespace after the element
		var $lastChild = $slider.find('> *').eq(-1)
		if ($lastChild.position().left + widthDelta < $slider.outerWidth() - $lastChild.outerWidth() - 1)
		{
			return true;
		}

		// get all the child elements, so we can loop through them and detmine offsets based
		// on widths
		var $siblings = $slider.find('> *');

		// finally loop through each child and kick off the animation
		$siblings.each(function(index)
		{
			// we'll determine the `left` in just a second, sit tight
			var left = 0;

			// localize the child element
			var $li = jQuery(this);

			// loop through each sibling and determine the new left
			if (index < focusedIndex)
			{
				left = -$slider.outerWidth();
			}

			if (index >= focusedIndex && index < focusedIndex + 3)
			{
				if ( jQuery(window).width() > 850 ) {
					left = 219 * (index - focusedIndex);
				}
				else {
					left = 162 * (index - focusedIndex);
				}
			}

			if (index >= focusedIndex + 3)
			{
				left = $slider.outerWidth() * 2;
			}


			// start the animation
			$li.animate({'left': left}, 300);

			// are we at the beginning?
			if (index == 0 && left == 0)
			{
				$slider.prop('controls').find('.prev').addClass('disabled');
			}
			else if (index == 0)
			{
				$slider.prop('controls').find('.prev').removeClass('disabled');
			}

			// are we at the end?
			if (index == $siblings.size()-1 && left == $slider.outerWidth() - $lastChild.outerWidth() - 1)
			{
				$slider.prop('controls').find('.next').addClass('disabled');
			}
			else if (index == $siblings.size()-1)
			{
				$slider.prop('controls').find('.next').removeClass('disabled');
			}
		});

		// if we got down here then we actually moved the slider, update the reference to the
		// focused slide
		$slider.prop('index', focusedIndex);
	});

	}
}

function headerTabs()
{
	var $tabset = jQuery('.action-footer .heading-tabset')

	$tabset.find('.listing:gt(0)').hide();
	$tabset.find('.controls:gt(0)').hide();
	$tabset.find('.heading-tab li').eq(0).addClass('active');

	jQuery(document).delegate('.action-footer .heading-tab a', 'click', function(event)
	{
		event.preventDefault();

		jQuery(this).parent().addClass('active');
		jQuery(this).parent().siblings().removeClass('active');

		var index = jQuery(this).parent().prevAll('*').size();

		jQuery(this).parents('.heading-tabset').find('.listing').hide();
		jQuery(this).parents('.heading-tabset').find('.listing').eq(index).show();

		jQuery(this).parents('.heading-tabset').find('.controls').hide();
		jQuery(this).parents('.heading-tabset').find('.controls').eq(index).show();
	});
}

function carousel()
{
	jQuery(document).delegate('.carousel .next, .carousel .previous', 'click', function(event)
	{
		// prevent the default anchor action
		event.preventDefault();

		// get the current carousel
		var $carousel = jQuery(this).parents('.carousel');

		// check if we're already in the middle of a movement
		if ($carousel.prop('moving'))
		{
			return true;
		}

		// if we actually clicked it, then stop any running timers
		if (event.clientX)
		{
			stop($carousel);
		}

		// localize the index, so we know where we are
		var index = $carousel.prop('index');

		// determine if we're going forward or backward
		var movingForward = jQuery(this).hasClass('next');

		// grab all the slides
		var $slides = $carousel.find('.carousel-item');

		// grab the currently focused slide
		var $focus = $slides.eq(index);

		// figure out where're we going from here
		var nextObject = movingForward ? nextSlide($carousel, index) : previousSlide($carousel, index);

		// locaalize the next div to be shown
		var $next = nextObject.element;

		// localize the index of the next element to be shown
		var newIndex = nextObject.index;

		// determine where we should place the next element so it slides from the correct side
		var initialLeft = movingForward ? jQuery(document.body).outerWidth() : -$next.outerWidth();

		// save the current zero position, everything will move to/from here
		var zeroPosition = $focus.offset().left;

		// determine where the focus is moving to
		var targetLeft = zeroPosition + (movingForward ? -$next.outerWidth() : $next.outerWidth());

		// we're comitted to moving now so set the flag to true so we don't duplicate animations
		$carousel.prop('moving', true);

		// reset all z-indexes to 1
		$slides.css('z-index', 1);

		// make the currently focused slide higher than all the rest
		$focus.css('z-index', 2);

		// setup the current slide so it can animate out
		$focus.css({
			"position": "absolute",
			"top": 0,
			"left": zeroPosition
		});

		// setup the next slide to slide in, moving it above the focused slide and off screen
		$next.css({
			"opacity": 0,
			"position": "absolute",
			"top": 0,
			"left": initialLeft,
			"z-index": 3
		});

		// animate the current slide out
		$focus.animate({
			"opacity": 0,
			"left": targetLeft
		}, 800);

		// set up what we're animating
		var animation = {
			"opacity": 1,
			"left": zeroPosition
		}

		// horrible ie fix
		if (jQuery.browser.msie && parseInt(jQuery.browser.version) <= 8)
		{
			delete animation.opacity;
			$focus.get(0).style.removeAttribute('filter');
			$next.get(0).style.removeAttribute('filter');
		}



		// animate in the next slide, then upon completion reset everything. switch it back to
		// relative positioning, remove our animation flag and hide the previous element
		$next.show().animate(animation, 800, function()
		{
			$focus.hide();
			jQuery(this).css({
				"position": "relative",
				"left": 0
			});

			// fix msie
			if (jQuery.browser.msie && parseInt(jQuery.browser.version) <= 8)
			{
				this.style.removeAttribute('filter');
			}

			$carousel.prop('moving', false);
		});

		// animate the height of our carousel, because things are abosulte the box model is shot
		$carousel.animate({
			//"min-height": $next.outerHeight()
		});

		// finally update our index to reflect the current view
		$carousel.prop('index', newIndex);
	});

	jQuery(document).delegate('.carousel .pause', 'click', function(event)
	{
		// prevent the default anchor action
		event.preventDefault();

		// localize the carousel
		var $carousel = jQuery(this).parents('.carousel');

		// get the current timer, if it exists
		var timer = $carousel.prop('timer');

		// no timer? start it
		if (!timer)
		{
			start($carousel);
		}

		// timer? stop it
		else
		{
			stop($carousel);
		}
	});

	// start a new timer, additionally update the play/pause button to the correct visual state
	function start($carousel)
	{
		timer = setInterval(function()
		{
			$carousel.find('.next').eq(0).trigger('click');

			//N.C.: added to stop carousel after one round.
			var index = $carousel.prop('index');
			if ( index==0 && carousel_round > 0 ) {
				stop($carousel);
			}
			else if ( index==1 ) {
				carousel_round++;
			}

		}, 5000);

		$carousel.prop('timer', timer);
		$carousel.find('.play.pause').removeClass('play');
	}

	// stop any existing timers, additionally update the play/pause button to the correct
	// visual state
	function stop($carousel)
	{
		clearInterval(timer);

		$carousel.prop('timer', false);
		$carousel.find('.pause').addClass('play');

		//N.C.: added to stop carousel after one round.
		carousel_round = 0;
	}

	function nextSlide($carousel, index)
	{
		var $slides = $carousel.find('.carousel-item');

		if (index+1 < $slides.size())
		{
			return {"index":index+1,  "element":$slides.eq(index+1)};
		}

		return {"index":0, "element":$slides.eq(0)};
	}

	function previousSlide($carousel, index)
	{
		var $slides = $carousel.find('.carousel-item');

		if (index-1 >= 0)
		{
			return {"index":index-1, "element":$slides.eq(index-1)};
		}

		return {"index":$slides.size()-1, "element":$slides.eq(-1)};
	}

	// build the controls for inclusion into the page
	var $previousBtn = jQuery('<a />', {"class": "previous", "href": "#", "text": "Previous"});
	var $playPauseBtn = jQuery('<a />', {"class": "play pause", "href": "#", "text": "Play/Pause"});
	var $nextBtn = jQuery('<a />', {"class": "next", "href": "#", "text": "Next"});
	var $controlsDiv = jQuery('<div />', {"class": "carousel-controls"});
	$controlsDiv.append($previousBtn);
	$controlsDiv.append($playPauseBtn);
	$controlsDiv.append($nextBtn);

	// loop through each carousel and set some default properties/styles
	jQuery('.carousel').each(function()
	{
		// localize the carousel to this function
		var $carousel = jQuery(this);

		// set the positioning and a default height, becuase we're going to be taken out of the
		// flow once our animation starts
		$carousel.css({
			"position": "relative"
			//"min-height": $carousel.find('.carousel-item').eq(0).outerHeight() //N.C. commented out
		});

		// store the currently visible slide's index
		$carousel.prop('index', 0);

		// hide subsequent slides
		$carousel.find('.carousel-item:gt(0)').hide();

		// append in our controls
		$carousel.prepend($controlsDiv.clone(true));

		// add the previous/next images
		$carousel.find('.main-image').each(function(index)
		{
			// get the previous image
			var $prevImage = jQuery(previousSlide($carousel, index).element).find('.main-image').clone();

			// remove the class
			$prevImage.removeClass('main-image');

			// create a link for the previous image
			var $previousAnchor = jQuery('<a />', {
				"href": "#",
				"class": "prev-image",
				"html": $prevImage
			});
			$previousAnchor.css('opacity', 0.2);

			// add in the previous image/anchor
			jQuery(this).before($previousAnchor);

			// get the next image
			var $nextImage = jQuery(nextSlide($carousel, index).element).find('.main-image').clone();

			// remove the class
			$nextImage.removeClass('main-image');

			// create a link for the previous image
			var $nextAnchor = jQuery('<a />', {
				"href": "#",
				"class": "next-image",
				"html": $nextImage
			});
			$nextAnchor.css('opacity', 0.2);

			// add in the next image/anchor
			jQuery(this).after($nextAnchor);
		});

		// start the carousel by default
		start($carousel);
	});
}

function emergencyClose() {
	//jQuery('.emergency .wrap').append('<a href="#" class="close">Close</a>');

	jQuery(document).delegate('.emergency .close', 'click', function(event)
	{
		event.preventDefault();
		jQuery(this).parents('.emergency').remove();
	});
}

/* Twitter Anywhere is deprecated. so we change to use other way to reply
function replyLinks() {
	$close = jQuery('<a />', {"class": "close", "href": "#", "text": "Close"});
	$twitterWrap = jQuery('<div />', {"id": "twitter-wrap"});
	$twitterWrap.append($close);
	$twitter = jQuery('<div />', {"id": "twitter"});
	$twitterWrap.append($twitter);
	jQuery(document.body).append($twitterWrap);

	twttr.anywhere(function (T) {
		T("#twitter").tweetBox({
			"width": 315,
			"height": 133,
			"defaultContent": "",
			"onTweet": function()
			{
				jQuery("#twitter-wrap").fadeOut('fast');
				jQuery('#overlay').fadeOut();
				jQuery('#overlay').remove();
				_gaq.push(['trackEvent', 'Home', 'SubmitReply', 'TwitterReply', 5]);
				//$twitter.remove();
			}
		});
	});

	jQuery(document).delegate('.link-reply', 'click', function(event)
	{
		event.preventDefault();

		//if ( !jQuery('#overlay') ) {
			jQuery(document.body).prepend(jQuery('<div />', {"id": "overlay"}));
		//}

		jQuery('#overlay').fadeIn();

		jQuery("#twitter-wrap").css({
			"position": "fixed",
			"top": 200,
			"left": (jQuery(document.body).width()-335)/2
		});

		if (jQuery.browser == 'msie')
		{
			jQuery("#twitter-wrap").css({
				"position": "absolute",
				"top": jQuery(document.body).scrollTop() + 200
			});
		}

		jQuery("#twitter-wrap").fadeIn('fast');
	});

	jQuery(document).delegate('#overlay, #twitter-wrap .close', 'click', function(event)
	{
		event.preventDefault();

		jQuery('#twitter-wrap').fadeOut('fast');
		jQuery('#overlay').fadeOut('fast', function()
		{
			jQuery(this).remove();
		})
	});
}
*/

function adjournLinks()
{
	jQuery('.adjoin-options').each(function()
	{
		var headings = [];

		jQuery(this).find('*[data-heading]').each(function()
		{
			headings[jQuery(this).attr('data-heading')] = jQuery(this).attr('data-heading');
		});

		var $headings = jQuery('<ul />', {
			"class": "adjoin-header"
		});

		for (var heading in headings)
		{
			var $li = jQuery('<li />');
			var $a = jQuery('<a />', {
				"href": "#",
				"onClick":  '_gaq.push([\'_trackEvent\', \'SocialDirectory\', \'Click\', \'Head'+heading+'\', 3]);',
				"data-show": heading,
				"text": heading
			})

			$li.append($a);
			$headings.append($li);
		}

		jQuery(this).before($headings);
	});

	jQuery(document).delegate('a[data-show]', 'click', function(event)
	{
		// stop the default click action
		event.preventDefault();

		// set active
		jQuery(this).parent().siblings().find('.active').removeClass('active');
		jQuery(this).addClass('active');

		// find the appropriate elements
		jQuery('.adjoin-options *[data-heading]').hide();
		jQuery('.adjoin-options *[data-heading="'+jQuery(this).attr('data-show')+'"].').fadeIn();
	});

	jQuery('.adjoin-header').find('a[data-show]').eq(0).trigger('click');
}

jQuery(document).ready(function ()
{
	var $filter = jQuery('#filter-drop');
	var $filterSpacer = jQuery('<div />', {
		"class": "filter-drop-spacer",
		"height": $filter.outerHeight()
	});
	var $homeShield = jQuery('.home .primary');
	var $totalHeight = jQuery('.carousel').outerHeight() + jQuery('.header').outerHeight()


	if ($filter.size())
	{
		jQuery(window).scroll(function ()
		{
			if(jQuery(window).scrollTop() > $totalHeight ) {

				$homeShield.addClass("shieldfix");
			}
			else if ($homeShield.hasClass('shieldfix')  && jQuery(window).scrollTop() < $totalHeight)
			{
				$homeShield.removeClass("shieldfix");
			}

			if (!$filter.hasClass('fix') && jQuery(window).scrollTop() > $filter.offset().top)
			{
				$filter.css('width', $filter.width());
				$filter.before($filterSpacer);
				$filter.addClass("fix");
			}
			else if ($filter.hasClass('fix')  && jQuery(window).scrollTop() < $filterSpacer.offset().top)
			{
				$filter.removeClass("fix");
				$filterSpacer.remove();
			}
		});
	}

});

function get_more_home_items() {

	if ( views_left>0 ) {
		jQuery("#home_items_loading").show();

		jQuery.ajax({
		  type: 'GET',
		  url: 'ajax/home_items/',
		  data: 'timestamp='+jQuery("#curr_timestamp").html()+'&index='+views_left,
		  dataType: 'json',
		  success: function(data) {
			jQuery("#home_items_loading").hide();
			jQuery("#curr_timestamp").html(data.timestamp);
			jQuery("#home_content").append(data.html);
		  }
		});

		views_left--;
	}

	var click_index = 2-views_left;

	_gaq.push(['_trackEvent', 'ViewMoreChannels', 'Click', 'ViewMore_'+click_index.toString(), 3]);

	if ( views_left<=0 ) {
		jQuery("#view_more").hide();
	}
}

/*-------------------------------------------
 	Add Zebra Strip Rows of table with class "stripe" -- Chris Traganos
-------------------------------------------*/
function zebra_strip_rows() {
  jQuery("table.stripe tr:odd").addClass("odd");
  jQuery("table.stripe tr:even").addClass("even");
}

function visitor_site_slideshow() {
  /*jQuery('.visitors_slideshow').cycle({
	  fx: 'fade' // choose your transition type, ex: fade, scrollUp, shuffle, etc...
  });*/

}

function utilDropDownMobile()
{
	jQuery('a.utility-trigger ').delegate('click', function()
	{
		//jQuery('.with-nav-dropdown ul').remove();
		jQuery("a.search-trigger").removeClass("active");
		jQuery('form#search').fadeOut("fast");
		jQuery('.utility ul').fadeToggle("fast").toggleClass("mobile-active");
		jQuery(this).toggleClass("active");

	});

	jQuery('a.search-trigger ').delegate('click', function()
	{
		jQuery("a.utility-trigger").removeClass("active");
		if ( jQuery('.utility ul').css('position')=='absolute' ) {
			jQuery('.utility ul').fadeOut("fast");
		}
		jQuery('form#search').fadeToggle("fast").toggleClass("mobile-active");
		jQuery(this).toggleClass("active");
		jQuery('#searchtext').focus();
	});
}
