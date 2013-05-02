;(function() {

    (function ($) {
        brite.registerView("ReportHeader",  {parent:".MainScreen-header"}, {
            create:function (data, config) {
                var $html = app.render("tmpl-ReportHeader");
               	var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                view.level = view.level || 2;
                view.scaleVal = view.scaleVal || 1;
                
                $e.find('#sl1').slider().off('slide').on('slide', function(ev){
                	if(view.level != ev.value){
                		view.level = ev.value;
	                	view.$el.trigger("DO_LEVEL_CHANGE",{level:ev.value});
                	}
				        });
				
        				$e.find('#sl2').slider().off('slide').on('slide', function(ev){
                  var scaleVal = ev.value / 100;
                  view.scaleVal = scaleVal;
                  view.$el.trigger("DO_ZOOM_CHANGE", {scaleVal : scaleVal}); 
        				});
            },
            events:{
            	"btap; .toolbar-button .btn":function(e){
            		app.ContactDao.update(app.createDataSet(30,3,6));
            	},
            	
            	"change; .useRAF input[type='checkbox']" : function(event){
      					var view = this;
      					if(app.useRAF){
      						app.useRAF = false;
      					}else{
      						app.useRAF = true;
      					}
      					view.$el.trigger("DO_RAF_CHANGE");
      				},
            	
            	"btap;.nav li.nav-menu":function(e){
            		var view = this;
            		var $e = view.$el;
            		var $li = $(e.currentTarget);
            		$e.find("li.nav-menu").removeClass("active");
            		$li.addClass("active");
            		var menu = $li.attr("data-nav");
            		
            		if(menu == "EaselJS Demo"){
                		brite.display("EaselJSForceClusterSlider");
                		$e.find("li.nav-item").removeClass("active");
                		$e.find("li.nav-item[data-nav='EaselJSForceClusterSlider']").addClass("active");
                		
                		//show the controlBar
                		$e.find(".controlBar").show();
            		}else{
                		//hide the controlBar
                		$e.find(".controlBar").hide();
            		}
            		
            	}
            	
            }
        });
        
    })(jQuery);
})();