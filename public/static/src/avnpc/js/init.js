eva.construct = function(){
	if($.browser.msie && (($.browser.version == "6.0" && !$.support.style) || $.browser.version == "7.0")) {
		jQuery.fx.off = true;
	}

	$("a[rel=external]").live("click", function(){
		$(this).attr("target", "_blank");		
	});

	$(".agotime").each(function(){
		var time = $(this);
		time.html(moment(time.attr("datetime"), "YYYY-MM-DDTHH:mm:ss ZZ").fromNow());
	});

	if(false === 'placeholder' in document.createElement('input')) {
		$('textarea[placeholder], input[placeholder]:not(:password)').each(function(){
			$(this).DefaultValue($(this).attr("placeholder"));		
		});
	}
};

eva.destruct = function(){
	//eva.login.init();
	//$.evaValidate.init();
};

eva.indexIndex = function(){

};

eva.indexLife = function(){

	/*
	$('#stories .item').css({
		"width" : 200,
		"float" : "left"		
	});
	*/

	var maxLoaded = 10;
	var loadTimes = 1;
	var container = $("#stories>.stories_wrap>.stories");
	var loader = $("#stories .load_story");
	$("body").append('<div id="load_area"></div>');
	var loadArea = $("#load_area");
	var loaded = [];

	var initStory = function(items){

		items.each(function(){
				
			var item = $(this);
			item.find(".agotime").each(function(){
				var time = $(this);
				time.html(moment(time.attr("datetime"), "YYYY-MM-DDTHH:mm:ss ZZ").fromNow());
			});
			if(item.hasClass("inited")){
				return true;
			}
			if(item.hasClass("type_note")){
				item.find(">.content").jScrollPane({autoReinitialise: true});	
			}

			item.addClass("inited");

			return true;
		});

	};

	$(window).resize(function(){
		container.masonry({
			itemSelector : '.item',
			columnWidth : $(window).width() > 800 ? 320 : 260,
			isAnimated: true
		}).masonry( 'reload' );
	});

	container.imagesLoaded( function(){
		container.masonry({
			itemSelector : '.item',
			columnWidth : $(window).width() > 800 ? 320 : 260,
			isAnimated: true
		});

		var items = container.find(".item:not(.inited)");
		//eva.p(items.length);
		initStory(items);
  	});

	loadArea.hide();
	function inArray(stringToSearch, arrayToSearch) {
		for (s = 0; s < arrayToSearch.length; s++) {
			thisEntry = arrayToSearch[s].toString();
			if (thisEntry == stringToSearch) {
				return true;
			}
		}
		return false;
	}
	
	var loadNewStory = function(loader){

		if(loadTimes > maxLoaded) {
			return false;
		}

		var url = loader.attr("href");
		if(inArray(url, loaded)){
			return false;
		}

		loader.addClass("disabled").html(" （；^ω^） 正在努力载入...");
		loaded.push(url);

		loadArea.load(url + ' #stories>.stories_wrap', function() {
			var newUrl = loadArea.find(".load_story").attr("href");
			loader.attr("href", newUrl); 
			var content = loadArea.find(".stories_wrap>.stories>.item");
			loadArea.imagesLoaded( function(){
				container.append(content).masonry( 'appended', content, true);
				initStory(container.find(".item:not(.inited)"));
				loadArea.html('');
				loader.removeClass("disabled").html("更多");
  			});
			loadTimes++;
		});

		return false;
	};

	/*
	$(".load_story").on("click", function(){
		loadNewStory($(this));		
		return false;
	});
	*/


	$(window).scroll(function () { 
    	var pageH = $(document).height(); //页面总高度 
	    var scrollT = $(window).scrollTop(); //滚动条top 
		var winH = $(window).height(); 
    	var offset = pageH - scrollT - winH;
		if(offset < 300){
			loadNewStory(loader);
		}
	}); 


	/*
	$('body').delegate(loader, 'waypoint.reached', function(event, direction) { 
	//$(".load_story").waypoint(function(event, direction) {
		loadNewStory(loader);
		return false;
	}, {
		offset: -100
	});
	*/
};

eva.getLife = function(){
	eva.indexLife();
};
