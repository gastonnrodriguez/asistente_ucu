jQuery(document).ready(function()
{

	// slider start
	jQuery('#f-carousel').carouFredSel(
	{
		width: '100%',
		items: 3,
		scroll: {
				items: 1,
				duration: 1000,
				pauseDuration: 3000
		},
		prev: '#prev',
		next: '#next',
		pagination:
		{
				container: '#pager'
		}
	});
	


	
	
	// menu start
	var jQueryoe_menu		= jQuery('#oe_menu');
	var jQueryoe_menu_items	= jQueryoe_menu.children('li');
	var jQueryoe_overlay		= jQuery('#oe_overlay');
	jQueryoe_menu_items.bind('mouseenter',function()
	{
		var jQuerythis = jQuery(this);
		jQuerythis.addClass('slided selected');
		jQuerythis.children('div').css('z-index','9999').stop(true,true).slideDown(200,function(){
			jQueryoe_menu_items.not('.slided').children('div').hide();
			jQuerythis.removeClass('slided');
		});
	}).bind('mouseleave',function()
	{
		var jQuerythis = jQuery(this);
		jQuerythis.removeClass('selected').children('div').css('z-index','1');
	});

	jQueryoe_menu.bind('mouseenter',function()
	{
		var jQuerythis = jQuery(this);
		jQueryoe_overlay.stop(true,true).fadeTo(200, 0.6);
		jQuerythis.addClass('hovered');
	}).bind('mouseleave',function(){
		var jQuerythis = jQuery(this);
		jQuerythis.removeClass('hovered');
		jQueryoe_overlay.stop(true,true).fadeTo(200, 0);
		jQueryoe_menu_items.children('div').hide();
	})
	
	// tab start
	jQuery(".tab_content,.tab_content1,.tab_content2").hide(); //Hide all content
	jQuery("ul.tabs li:first,ul.tabs1 li:first,ul.tabs2 li:first").addClass("active").show(); //Activate first tab
	jQuery(".tab_content:first").show(); //Show first tab content
	jQuery(".tab_content1:first").show(); //Show first tab content
	jQuery(".tab_content2:first").show(); //Show first tab content
	
	//On Click Event
	jQuery("ul.tabs li").click(function() {
		jQuery("ul.tabs li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(".tab_content").hide(); //Hide all tab content
		var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		jQuery(activeTab).fadeIn(); //Fade in the active content
		return false;
	});
	jQuery("ul.tabs1 li").click(function() {
		jQuery("ul.tabs1 li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(".tab_content1").hide(); //Hide all tab content
		var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		jQuery(activeTab).fadeIn(); //Fade in the active content
		return false;
	});
	jQuery("ul.tabs2 li").click(function() {
		jQuery("ul.tabs2 li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(".tab_content2").hide(); //Hide all tab content
		var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		jQuery(activeTab).fadeIn(); //Fade in the active content
		return false;
	});
	
	// mycarousel start
	//jQuery('#mycarousel').jcarousel();
	jQuery('#mycarousel').jcarousel({
                scroll: 1
        });
	
	jQuery('.home_blocks_box h2 a').each(function(i){
		len = jQuery(this).text().length;
		if(len>50) {
			jQuery(this).text( jQuery(this).text().substr(0,50)+'...' );
		}
	});

	jQuery('.i18n-es .portal-search input').attr('placeholder', 'Ingrese su búsqueda');
    jQuery('.i18n-en .portal-search input').attr('placeholder', 'Search');

    var clases = ["col-md-6", "con-imagen"];
    clases.forEach(function(entry) {
        if(jQuery("."+entry).length) jQuery("."+entry).children('.contentbox').addClass(entry);
    });

    var clases2 = ["col-md-3", "col-md-4", "col-md-6", "col-md-12"];
    clases2.forEach(function(entry) {
        if(jQuery("."+entry).length) jQuery("."+entry).children('.contentbox').addClass("col-md-12");
    });

    var clases3 = ["con-imagen", "col-md-9"];
    clases3.forEach(function(entry) {
        if(jQuery("."+entry).length) jQuery("."+entry).children('.contentbox').addClass("col-md-6");
    });

  // Se le ajusta la altura al título y descripcion de las noticias con imagen
  /*setTimeout(function() {
    if(jQuery(".masonry-item-portalbox-noticia-con-img-50")) {
      var title_height = jQuery(".masonry-item-portalbox-noticia-con-img-50 .node > h2").height();
      jQuery(".masonry-item-portalbox-noticia-con-img-50 .node > .field-name-field-short-description-for-slid").css("margin-top", title_height + 2);
    }
  }, 1000);*/

  // Get active value from View.
  var activeText = jQuery(".dropdown").children(".dropdown-menu").find(".active").last().text();
  jQuery(".dropdown-toggle").children(".btn-text").text(activeText);
  jQuery(".dropdown").on("hide.bs.dropdown", function () {
    jQuery(".dropdown-toggle").children(".btn-text").text(activeText);
  });

});
function changeVideo(id)
{
	document.getElementById("mainvideoiframe").src = "http://www.youtube.com/embed/"+id;
}
/*
* recaga la pagina al cambiar el ancho
* */
jQuery(function($){
    var windowWidth = jQuery(window).width();
    jQuery(window).resize(function() {
        if(windowWidth != jQuery(window).width() ) {
            location.reload();
            return;
        }
    });
});