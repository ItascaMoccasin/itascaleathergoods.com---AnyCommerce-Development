/* **************************************************************

   Copyright 2011 Zoovy, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

************************************************************** */

/*
An extension for acquiring and displaying 'lists' of categories.
The functions here are designed to work with 'reasonable' size lists of categories.
*/


var store_itasca = function() {
	var r = {

	vars : {
		catTemplates : {
			".leathergoods.leather_swatches" : "leatherSwatchTemplate"
		}
	},

					////////////////////////////////////   CALLS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\		


//store_search contains the maintained elastic query search. use that.
	calls : {}, //calls


					////////////////////////////////////   CALLBACKS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



	callbacks : {
//callbacks.init need to return either a true or a false, depending on whether or not the file will execute properly based on store account configuration. Use this for any config or dependencies that need to occur.
//the callback is auto-executed as part of the extensions loading process.
		init : {
			onSuccess : function()	{
				},
			onError : function()	{
//errors will get reported for this callback as part of the extensions loading.  This is here for extra error handling purposes.
				}
			},

			startExtension : {
				onSuccess : function() {
				},
				onError : function (){
				}
			}
		}, //callbacks

////////////////////////////////////   Actions    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


		a : {
			customInstructionsYes : function(){
				$(".CustomInstructInput").show();
				$(".customInstYes").css("background-color", "black");
				$(".customInstYes").css("color", "white");
				$(".customInstNo").css("background-color", "white");
				$(".customInstNo").css("color", "black");
			},
			customInstructionsNo : function(){
				$(".CustomInstructInput").val("");
				$(".CustomInstructInput").hide();
				$(".customInstYes").css("background-color", "white");
				$(".customInstYes").css("color", "black");
				$(".customInstNo").css("background-color", "black");
				$(".customInstNo").css("color", "white");
			},
			
			
			showLargeImage : function($container, index){
				//app.u.dump("$container = " + $container);
				//app.u.dump("index = " + index);
				//app.u.dump($('div.mzpContainer', $container).each());
				//app.u.dump($(this).attr('data-index'));
				app.u.dump("starting main image swapping function");
			$.each($('div.mzpContainer', $container), function(){
				 app.u.dump("Hiding " + this );
				  $(this).hide();
				  if($(this).attr('data-index') == index){
					  app.u.dump("Showing " + this );
				   $(this).show();
				  }
			 });
			},
			
			
			
			swapLargeImage : function(index){
				$(".prodBigImage").hide();
				if($(this).attr('data-index') == index){
					$(this).show();
				}
			}

			
		}, //actions

////////////////////////////////////   RENDERFORMATS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//renderFormats are what is used to actually output data.
//on a data-bind, format: is equal to a renderformat. extension: tells the rendering engine where to look for the renderFormat.
//that way, two render formats named the same (but in different extensions) don't overwrite each other.
		renderFormats : {
				mainProductImages : function($tag,data)	{
//				app.u.dump("BEGIN beachmart.renderFormats.productImages ["+data.value+"]");
				var pdata = app.data['appProductGet|'+data.value]['%attribs']; //short cut to product object in memory.
				var imgs = ''; //all the html for all the images. appended to $tag after loop.
				var imgName; //recycled in loop.
				for(i = 1; i < 30; i += 1)	{
					imgName = pdata['zoovy:prod_image'+i];
//					app.u.dump(" -> "+i+": "+imgName);
					if(app.u.isSet(imgName))	{
						imgs += "<li><a class='MagicThumb MagicThumb-swap' rel='zoom-id: prodBigImage_href;' rev='"+app.u.makeImage({'tag':0,'w':380,'h':380,'name':imgName,'b':'ffffff'})+"' href='"+app.u.makeImage({'tag':0,'w':'','h':'','name':imgName,'b':'ffffff'})+"'><img src='"+app.u.makeImage({'tag':0,'w':50,'h':50,'name':imgName,'b':'ffffff'})+"' \/><\/a><\/li>";
						}
					}
				$tag.append(imgs);
				} //productImages
			}, //renderFormats
////////////////////////////////////   UTIL    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


		u : {
				getProdContext : function(pid){
					return $(app.u.jqSelector('#productTemplate_'+pid));
				},
				
				setTitle : function(title){
					if(title && typeof title ==="string"){
						//This is what we expect
						}
					else{
						//Go home title.  You are drunk.
						title = "Handmade Moccasins"; 
						}

					document.title = title+" | Itasca Leathergoods";
				}
			}, //u



//app-events are added to an element through data-app-event="extensionName|functionName"
//right now, these are not fully supported, but they will be going forward. 
//they're used heavily in the admin.html file.
//while no naming convention is stricly forced, 
//when adding an event, be sure to do off('click.appEventName') and then on('click.appEventName') to ensure the same event is not double-added if app events were to get run again over the same template.
		e : {
			} //e [app Events]
		} //r object.
	return r;
	}