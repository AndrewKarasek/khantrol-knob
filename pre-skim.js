// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "khantrolKnob",
				defaults = {
				
					startingPos: -135,
					range: 270,
					css: "default",
					responsive: false,

					moveBy: 0.1,
					minVal: 0,
					maxVal: 100,
					speed: 20,
					holdKey: false,
					groupKey: false,
					alsoTurn: false,
					placeInner: ".nu",
					innerHTML: "",
					focusMode: true,

					progressMode: "false",
					progressGap: 10,
					progressWidth: 15,

					scaleExt: 5,
					scaleBase: 3,

					extraHTML: "",

		};

		// The actual plugin constructor
		function Plugin ( element, options ) {


				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._name = pluginName;this._defaults = defaults;
			
				this.init();

				this.behaviour();
		}



		Plugin.prototype = {
				init: function () {
					var elm = $(this.element);
					var range = this.settings.range;
					var startpos = range / 2;
					var css = this.settings.css;
					var responsive = this.settings.responsive;

					if(range === Infinity){
						startpos = 0;
					}

					var outerHTML = this.settings.outerHTML;

					elm.wrap("<div class='khantrol-knob kk-"+css+"'>");
					var wrap = elm.parent();

					
					wrap.prepend("<div class='kk-face'><div class='kk-movingFace'><div class='kk-hand'></div></div></div><canvas class='kk-progress'></canvas>");
					
					if(this.settings.extraHTML !== ""){
						wrap.prepend(this.settings.extraHTML);
					}

					var faceWrap = wrap.find(".kk-face");

				
					var movingFace = faceWrap.find(".kk-movingFace");
					var hand = movingFace.find(".kk-hand");
					var canvas = {};

					wrap
						.append("<span class='kk-value'>"+this.settings.minVal+"</span>");
						//.css("height", "auto") //stop silly css'rs overwritings
						//.css("width", "auto"); //required styles (for progress meters)

					movingFace
						.css("position", "relative")
						.css("overflow", "hidden")
						.css("float", "none")
						.css("-webkit-transform", "rotate("+(-startpos)+"deg)")
						.css("-moz-transform", "rotate("+(-startpos)+"deg)")
						.css("-ms-transform", "rotate("+(-startpos)+"deg)")
						.css("-o-transform", "rotate("+(-startpos)+"deg)")
						.css("transform", "rotate("+(-startpos)+"deg)")
						.data("degs", -startpos)
						.data("value", 0)
						.data("md", false)
						.css("z-index", "29");

					faceWrap
						.css("float", "none");
					
				
					canvas = wrap.find(".kk-progress");
					canvas
						.css("position", "absolute") //summin weird here causes performance increase
						.css("top", 0)				 //on mobile
						.css("left", 0)
						.css("z-index", "0");

					if(this.settings.responsive){
						wrap.addClass("kk-fluid");
						wrap.find(".kk-face").css("height", wrap.find(".kk-face").width());						
					}

					var left = (movingFace.innerWidth() / 2) - (hand.width() / 2); //hand location
	
					hand
						.css("position", "absolute")
						.css("left", left)
						.css("height", movingFace.height() / 2);

					$(window).resize(function(){
						if(responsive){
							var left = (movingFace.innerWidth() / 2) - (hand.width() / 2); //hand location
							wrap.find(".kk-face").css("height", wrap.find(".kk-face").width());
							hand
								.css("left", left)
								.css("height", movingFace.height() / 2);
						}
					});

					elm.attr("value", this.settings.minVal);
				
				},

				behaviour: function () {
					var elm = $(this.element);
					var knob = elm.parent();
					
					var movingFace = knob.find(".kk-movingFace");
					var mouse = {};
					var moveby = this.settings.moveBy;
					var myKey = this.settings.holdKey;
					var myGroupKey = this.settings.groupKey;
					var degRange = this.settings.range;
					var max = degRange / 2;
					var min = max * -1;
					var focusMode = this.settings.focusMode;
					var responsive = this.settings.responsive;


					var pmode = this.settings.progressMode;
					var pgap = this.settings.progressGap + (movingFace.width() / 2);
					
					var ext = this.settings.scaleExt;
					var scaleBase = this.settings.scaleBase;
					var pwidth = this.settings.progressWidth;

					var posTracker = 0;
					var minVal = this.settings.minVal;
					var maxVal = this.settings.maxVal;
					var range = maxVal - minVal;
					var rosetta = degRange / range;
					var startpos = this.settings.range / 2;
		
					var degScale = this.settings.range / (this.settings.maxVal - this.settings.minVal);

					mouse.clickpos = 0;
					mouse.focus = elm;	//last knob clicked
					mouse.holdKey = false; 
					mouse.groupKey = false;
					var speed = this.settings.speed;

		

					function toRad(x){

						var f = x * (Math.PI / 180);
						
						return f;
					}

					function toTheirs(x){
					
						x=x+270;
						
						return x;
					}
	
					function performanceMagic(){
						var canvas = knob.find("canvas").get(0);
						var context = canvas.getContext('2d');
						context.clearRect ( 0 , 0 , 0, 1);
						//I have absolutely no clue why this increases the performance
					} 

			
					
					function preTurn(elm, e){
				
						mouse.clickpos = e.pageY || e.originalEvent.targetTouches[0].pageY;

						mouse.focus = elm;

						elm.data("md", true);
				
					}


					function turnKnob(e, downKey, upKey, touch){

						if(mouse.focus.data("md") || downKey || upKey){
							
							if(!downKey && !upKey){
								var newPos = e.pageY || e.originalEvent.targetTouches[0].pageY;
								//console.log(degScale);
								console.log("mouse moved");
							}
							
							if(touch){ //for touch movements, save performance and increase amount moved
								moveby = 7;
							}
						
							var thisElm = mouse.focus; //click checks the elm on click
							if(downKey || upKey){ //key elm is bound on creation
								thisElm = movingFace;
							}
						
								var degs = thisElm.data("degs"); //get the degrees set

								if(mouse.clickpos < newPos || downKey){
									if(newPos < posTracker){ //mouse direction shifting
										console.log("CHANGED D, down now up");
										//expoReset();
										if(degs+moveby < max){
											//degs=degs+1; 
										} else{
											degs = max;
										}	
									} else { //regular movement DOWN

										if(degs-moveby > min){
											var diff = (mouse.clickpos - newPos);
											console.log(diff);
											degs = (diff * degScale) - startpos;

										} else{
											degs = min; 
										}
									}
				
								} else if(mouse.clickpos > newPos || upKey){
			
									if(newPos > posTracker){ //mouse direction shifting
										//console.log("CHANGED D up now down");
										//expoReset();
										if(degs-moveby > min){
											//degs=degs-1; 
										} else{
											degs = min; 
										}
									} else{ //regular movement UP
										if(degs+moveby < max){
											var diff = (mouse.clickpos - newPos);
											console.log(diff);
											degs = (diff * degScale) - startpos;

											
										} else{
											degs = max;
										}		
									}
								}

								if(degs > min){
									elm.parent().addClass("turned-on");
								} else {
									elm.parent().removeClass("turned-on");
								}

								thisElm
									.data("degs", degs) //update the degs data
									.css("-webkit-transform", "rotate("+degs+"deg)")
									.css("-moz-transform", "rotate("+degs+"deg)")
									.css("-ms-transform", "rotate("+degs+"deg)")
									.css("-o-transform", "rotate("+degs+"deg)")
									.css("transform", "rotate("+degs+"deg)");
									 //update css

								var regDegs = thisElm.data("degs") + max; //won't be the same for every case, thise is only because of negative
								var val = Math.round(regDegs / rosetta);
								thisElm.data("value", val);

								thisElm.trigger("change");
								thisElm.parent().find(".khantrolKnob").trigger("change");

								if(pmode === "bar"){
									progArc(toTheirs(degs));
								}
								if(!downKey && !upKey){
									posTracker = e.pageY || e.originalEvent.targetTouches[0].pageY;
								}
								
							e.preventDefault();
						}
					}

					function mouseup(){
						mouse.focus.data("md", false);
						expoReset();
					}	

					function expoReset(){
						moveby = 0.1;
					}

					function keyHolding(e){
						mouse.holdKey = true;
						movingFace.parent().parent().addClass("holding");
					}

					function groupHolding(){
						mouse.groupKey = true;
						movingFace.parent().parent().addClass("holding");
					}

					function groupRelease(){
						mouse.groupKey = false;
						movingFace.parent().parent().removeClass("holding");
					}

					function keyRelease(){
						mouse.holdKey = false;
						movingFace.parent().parent().removeClass("holding");
					}

					function upKey(e){
						if(mouse.holdKey === true || mouse.groupKey){
							turnKnob(e, false, true);
						}
					}

					function downKey(e){
						if(mouse.holdKey === true || mouse.groupKey){
							turnKnob(e, true, false);
						}
					}

					movingFace.on("touchstart", function(e){
					
						//focusToggle($(this)); //fix me later I suck
						preTurn($(this), e);

					});

					$(document).on("touchmove", function(e){
						turnKnob(e, false, false, true);
					});

					$(document).on("touchend", function(e){
						mouseup();
					});

					movingFace.on("mousedown", function(e){
						preTurn($(this), e);
					});

					$(document).on("mousemove", function(e){

						turnKnob(e, false, false);

					});

					$(document).on("mouseup", function(){
						mouseup();
						
					});

					$(document).on("keydown", function(e){
						var code = e.keyCode || e.which;

						if(code === 38){
							upKey(e);
						} else if(code === 40){
							downKey(e);
						}

						if(code === myKey){
							keyHolding();
							e.preventDefault();
						} if(code === myGroupKey){
							groupHolding();
							e.preventDefault();
							
						}

					});
					$(document).on("keyup", function(e){
						var code = e.keyCode || e.which;
						
						if(code === myKey){
							keyRelease();
							expoReset();
						} if(code === myGroupKey){
							groupRelease();
							expoReset();
						}

						if(code === 38 || code === 40){
							expoReset();
						}
				
					});

					movingFace.on("change", function(e){
						var val = $(this).data("value");
						elm.attr("value", val);
						$(this).parent().parent().find(".kk-value").html(val);
						elm.trigger("change");
					});

				}
			
		};


		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
