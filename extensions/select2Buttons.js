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


var partner_convertSelectToButton = function() {
	var r = {

	vars : {
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
		}, //actions

////////////////////////////////////   RENDERFORMATS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//renderFormats are what is used to actually output data.
//on a data-bind, format: is equal to a renderformat. extension: tells the rendering engine where to look for the renderFormat.
//that way, two render formats named the same (but in different extensions) don't overwrite each other.
		renderFormats : {

		}, //renderFormats
////////////////////////////////////   UTIL    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


		u : {
			
			 /**
			 * .select2Buttons - Convert standard html select into button like elements
			 *
			 * Version: 1.0.1
			 * Updated: 2011-04-14
			 *
			 *  Provides an alternative look and feel for HTML select buttons, inspired by threadless.com
			 *
			 * Author: Sam Cavenagh (cavenaghweb@hotmail.com)
			 * Doco and Source: https://github.com/o-sam-o/jquery.select2Buttons
			 *
			 * Licensed under the MIT
			 **/
			jQuery.fn.select2Buttons : function(options) {
			  return this.each(function(){
				var $ = jQuery;
				var select = $(this);
				var multiselect = select.attr('multiple');
				select.hide();
			
				var buttonsHtml = $('<div class="select2Buttons"></div>');
				var selectIndex = 0;
				var addOptGroup = function(optGroup){
				  if (optGroup.attr('label')){
					buttonsHtml.append('<strong>' + optGroup.attr('label') + '</strong>');
				  }
				  var ulHtml =  $('<ul class="select-buttons">');
				  optGroup.children('option').each(function(){
					var liHtml = $('<li></li>');
					if ($(this).attr('disabled') || select.attr('disabled')){
					  liHtml.addClass('disabled');
					  liHtml.append('<span>' + $(this).html() + '</span>');
					}else{
					  liHtml.append('<a href="#" data-select-index="' + selectIndex + '">' + $(this).html() + '</a>');
					}
			
					// Mark current selection as "picked"
					if((!options || !options.noDefault) && $(this).attr('selected')){
					  liHtml.children('a, span').addClass('picked');
					}
					ulHtml.append(liHtml);
					selectIndex++;
				  });
				  buttonsHtml.append(ulHtml);
				}
			
				var optGroups = select.children('optgroup');
				if (optGroups.length == 0) {
				  addOptGroup(select);
				}else{
				  optGroups.each(function(){
					addOptGroup($(this));
				  });
				}
			
				select.after(buttonsHtml);
			
				buttonsHtml.find('a').click(function(e){
				  e.preventDefault();
				  var clickedOption = $(select.find('option')[$(this).attr('data-select-index')]);
				  if(multiselect){
					if(clickedOption.attr('selected')){
					  $(this).removeClass('picked');
					  clickedOption.removeAttr('selected');
					}else{
					  $(this).addClass('picked');
					  clickedOption.attr('selected', 'selected');
					}
				  }else{
					buttonsHtml.find('a, span').removeClass('picked');
					$(this).addClass('picked');
					clickedOption.attr('selected', 'selected');
				  }
				  select.trigger('change');
				});
  			});
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
