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

	if($("#blog pre>code")[0]){
		eva.loadcss(eva.s(['/lib/js/google-code-prettify/prettify.css']));
		$("#blog pre>code").each(function(){
			var $this = $(this),
			pre = $this.parent(),
			$code = $this.html();
			pre.html($code).addClass('prettyprint');
		});
		eva.loader(eva.s(['/lib/js/google-code-prettify/prettify.js']), function(){
			prettyPrint();
		});
	}
	eva.story();

	if($("#timeline-embed")[0]){
		var $timeline = $("#timeline-embed");
		$("body").addClass('timeline');
		eva.loader(eva.s(['src/avnpc/timeline/js/storyjs-embed.js']), function(){
			var minHeight = 550;
			var height = $(window).height() > minHeight ? $(window).height() - 85 : minHeight;
			var source = $timeline.html();
			//source = eva.d('proxy/') + '?page=' + encodeURIComponent(source.replace(/&amp;/g, '&'));
			source = eva.d('proxy/spreadsheet');
			$timeline.empty();
			var config = {
				type:               'timeline',
				width:              '100%',
				height:             height,
				start_at_end:       true, 
				debug:              false,
				lang:               'zh-cn',
				source:             source,
				embed_id:           'timeline-embed',
				js:                 eva.s('src/avnpc/timeline/js/timeline.min.js'), 
				css:                eva.s('src/avnpc/timeline/css/timeline.css') 
			};
			//console.log(config);
			createStoryJS(config);
		});	
	}

};

eva.destruct = function(){
	//eva.login.init();
	//$.evaValidate.init();
};

eva.story = function(){

	if(!$("#stories")[0]){
		return false;
	}

	var startStory = function(){
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

		$(window).scroll(function () { 
			var pageH = $(document).height(); //页面总高度 
			var scrollT = $(window).scrollTop(); //滚动条top 
			var winH = $(window).height(); 
			var offset = pageH - scrollT - winH;
			if(offset < 300){
				loadNewStory(loader);
			}
		}); 
	}

	eva.loader(eva.s([
		'/lib/js/jquery/jquery.masonry.js',
		'/lib/js/jquery/jquery.mousewheel.js',
		'/lib/js/jquery/jquery.jscrollpane.js'
	]), startStory);
};

eva.init(eva_config);
