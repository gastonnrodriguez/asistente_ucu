/************************************************************************************************************
Vertical slideshow
Copyright (C) November 2005 - February 2011  DTHMLGoodies.com, Alf Magne Kalleland

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

Dhtmlgoodies.com., hereby disclaims all copyright interest in this script
written by Alf Magne Kalleland.

Alf Magne Kalleland, 2010
Owner of DHTMLgoodies.com

************************************************************************************************************/
if(!window.DG) {
	window.DG = {};
};

DG.ImageSlideShowVertical = new Class({

	arrowImageHeight : 35,	// Height of arrow image in pixels;
	displayWaitMessage : true,	// Display a please wait message while images are loading?

	previewImage : false,
	previewImageParent : false,
	slideSpeed : 0,
	previewImagePane : false,
	slideEndMarker : false,
	el : null,
	galleryContainer : false,
	imageGalleryCaptions : [],
	elWaitMessage : null,


	initialize : function(config) {
		this.el = $(config.el);
		this.initGalleryScript();

	},
	getTopPos : function(inputObj)
	{

	  var returnValue = inputObj.offsetTop;
	  while((inputObj = inputObj.offsetParent) != null)returnValue += inputObj.offsetTop;
	  return returnValue;
	},

	getLeftPos : function(inputObj)
	{

	  var returnValue = inputObj.offsetLeft;
	  while((inputObj = inputObj.offsetParent) != null)returnValue += inputObj.offsetLeft;
	  return returnValue;
	},

	showPreview: function(e){

		var target = e.target;

		if (target.tagName != 'a') {
			target = target.parentNode;
		}
		var newSrc = target.title;

		if(!newSrc){
			return;

		}
		var imageIndex = target.getProperty('index');


		if (!this.previewImage) {
			var previewPane = this.el.getElements('.previewPane')[0];
			var images = previewPane.getElements('IMG');
			if (images.length > 0) {
				this.previewImage = images[0];
			}
			else {
				this.previewImage = document.createElement('IMG');
				previewPane.adopt(previewImage);
			}
		}

		if (this.displayWaitMessage) {
			this.elWaitMessage.setStyle('display', 'inline')
		}
		//this.el.getElements('.largeImageCaption')[0].setStyle('display', 'none');

        this.previewImage.removeEvents();
		this.previewImage.addEvent('load', this.hideWaitMessageAndShowCaption.bind(this, [imageIndex]));
		this.previewImage.src = newSrc;

		return false;


	},
	hideWaitMessageAndShowCaption : function(imageIndex)
	{

		this.elWaitMessage.setStyle('display','none')
		//this.el.getElements('.largeImageCaption')[0].set('html', this.imageGalleryCaptions[imageIndex]);
		//this.el.getElements('.largeImageCaption')[0].setStyle('display','block')


	},
	initSlide : function(e)
	{
		var src = e.target.src;
		if (src.indexOf('over') < 0) {
			e.target.src = e.target.src.replace('.gif', '-over.gif');
		}
		this.slideSpeed = e.client.y + Math.max(document.body.scrollTop,document.documentElement.scrollTop) - this.getTopPos(e.target);
		if(src.indexOf('down')>=0){
			this.slideSpeed = (this.slideSpeed)*-1;
		}else{
			this.slideSpeed = this.arrowImageHeight - this.slideSpeed;
		}
		this.slideSpeed = Math.round(this.slideSpeed * 20 / this.arrowImageHeight);
	},

	stopSlide : function(e)
	{
		this.slideSpeed = 0;
		e.target.src = e.target.src.replace('-over','');
	},

	slidePreviewPane : function()
	{
		if(this.slideSpeed!=0){
			var topPos = this.previewImagePane.style.top.replace(/[^\-0-9]/g,'')/1;

			if(this.slideSpeed<0 && this.slideEndMarker.offsetTop<(this.previewImageParent.offsetHeight - topPos)){
				this.slideSpeed=0;

			}
			topPos = topPos + this.slideSpeed;
			if(topPos>0)topPos=0;

		 	this.previewImagePane.style.top = topPos + 'px';

		}
		this.slidePreviewPane.delay(30, this);

	},

	revealThumbnail : function(e)
	{
		e.target.addClass('imgOver');
	},

	hideThumbnail : function(e)
	{
		e.target.removeClass('imgOver');
	},

	initGalleryScript : function()
	{

		this.previewImageParent = this.el.getElements('.theImages')[0];
		this.previewImagePane = this.previewImageParent.getElements('DIV')[0];
		this.previewImagePane.style.top = '0px';
		this.galleryContainer  = this.el.getElements('.galleryContainer')[0];
		var images = this.previewImagePane.getElements('IMG');
		for(var no=0;no<images.length;no++){
			images[no].addEvent('mouseover', this.revealThumbnail.bind(this));
			images[no].addEvent('mouseout', this.hideThumbnail.bind(this));
		}
		this.slideEndMarker = this.el.getElements('.slideEnd')[0];

		var arrowUp = this.el.getElements('.arrow_up_image')[0];
		arrowUp.addEvent('mousemove', this.initSlide.bind(this));
		arrowUp.addEvent('mouseout', this.stopSlide.bind(this));

		this.elWaitMessage = this.el.getElements('.waitMessage')[0];

		var arrowDown = this.el.getElements('.arrow_down_image')[0];
		arrowDown.addEvent('mousemove', this.initSlide.bind(this));
		arrowDown.addEvent('mouseout', this.stopSlide.bind(this));
		var divs = this.previewImageParent.getElementsByTagName('DIV');
		for(var no=0;no<divs.length;no++){
			if (divs[no].className == 'imageCaption') {
				this.imageGalleryCaptions[this.imageGalleryCaptions.length] = divs[no].innerHTML;
			}
		}

		var aTags = this.previewImageParent.getElements('a');
		for(var i=0;i<aTags.length;i++){
			aTags[i].setProperty('index', i);
			aTags[i].addEvent('click', this.showPreview.bind(this));
		}
		this.slidePreviewPane();

	}

});

window.addEvent('domready', function() {
    var slideshows = $$('.dhtmlgoodies_slideshow');


	for(i=0;i<slideshows.length;i++) {
		var show = new DG.ImageSlideShowVertical({ el : slideshows[i]});
	}
});


