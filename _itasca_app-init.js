var app = app || {vars:{},u:{}}; //make sure app exists.
app.rq = app.rq || []; //ensure array is defined. rq = resource queue.



app.rq.push(['extension',0,'orderCreate','extensions/checkout/extension.js']);
app.rq.push(['extension',0,'cco','extensions/cart_checkout_order.js']);

app.rq.push(['extension',0,'store_itasca','extensions/store_itasca.js'])

app.rq.push(['extension',0,'store_prodlist','extensions/store_prodlist.js']);
app.rq.push(['extension',0,'store_navcats','extensions/store_navcats.js']);
app.rq.push(['extension',0,'store_search','extensions/store_search.js']);
app.rq.push(['extension',0,'store_product','extensions/store_product.js']);
app.rq.push(['extension',0,'store_cart','extensions/store_cart.js']);
app.rq.push(['extension',0,'store_crm','extensions/store_crm.js']);
app.rq.push(['extension',0,'myRIA','app-quickstart.js','startMyProgram']);

app.rq.push(['extension',0,'magicToolBox_mzp','extensions/partner_magictoolbox_mzp.js','startExtension']);
app.rq.push(['extension',0,'partner_addthis','extensions/partner_addthis.js']);
app.rq.push(['extension',1,'google_analytics','extensions/partner_google_analytics.js','startExtension']);
//app.rq.push(['extension',1,'tools_ABtesting','extensions/tools_ABtesting.js']);
//app.rq.push(['extension',0,'partner_addthis','extensions/partner_addthis.js','startExtension']);
//app.rq.push(['extension',1,'resellerratings_survey','extensions/partner_buysafe_guarantee.js','startExtension']); /// !!! needs testing.
//app.rq.push(['extension',1,'buysafe_guarantee','extensions/partner_buysafe_guarantee.js','startExtension']);
//app.rq.push(['extension',1,'powerReviews_reviews','extensions/partner_powerreviews_reviews.js','startExtension']);
//app.rq.push(['extension',0,'magicToolBox_mzp','extensions/partner_magictoolbox_mzp.js','startExtension']); // (not working yet - ticket in to MTB)

app.rq.push(['script',0,(document.location.protocol == 'file:') ? app.vars.testURL+'jquery/config.js' : app.vars.baseURL+'jquery/config.js']); //The config.js is dynamically generated.
app.rq.push(['script',0,app.vars.baseURL+'model.js']); //'validator':function(){return (typeof zoovyModel == 'function') ? true : false;}}
app.rq.push(['script',0,app.vars.baseURL+'includes.js']); //','validator':function(){return (typeof handlePogs == 'function') ? true : false;}})

app.rq.push(['script',0,app.vars.baseURL+'controller.js']);
app.rq.push(['script',1,app.vars.baseURL+'resources/jquery.ui.jeditable.js']); //used for making text editable (customer address). non-essential. loaded late.
app.rq.push(['script',0,app.vars.baseURL+'resources/jquery.showloading-v1.0.jt.js']); //used pretty early in process..
app.rq.push(['script',0,app.vars.baseURL+'resources/jquery.ui.anyplugins.js']); //in zero pass in case product page is first page.
app.rq.push(['script',0,app.vars.baseURL+'carouFredSel-6.2.1/jquery.carouFredSel-6.2.1-packed.js']);
app.rq.push(['script',0,app.vars.baseURL+'jquery.select2Buttons/jQuery.select2Buttons.js']);
app.rq.push(['script',0,app.vars.baseURL+'anyplugins.js']);



//add tabs to product data.
//tabs are handled this way because jquery UI tabs REALLY wants an id and this ensures unique id's between product
app.rq.push(['templateFunction','productTemplate','onCompletes',function(P) {
	var $context = $(app.u.jqSelector('#',P.parentID));
	var $tabContainer = $( ".tabbedProductContent",$context);
		if($tabContainer.length)	{
			if($tabContainer.data("widget") == 'anytabs'){} //tabs have already been instantiated. no need to be redundant.
			else	{
				$tabContainer.anytabs();
				}
			}
		else	{} //couldn't find the tab to tabificate.
		
		
		
		var $context = $(app.u.jqSelector('#',P.parentID));
		app.u.dump($context);
			
		//PRODUCT PAGE ATC VARIATIONS CUSTOMIZATION
		//CONVERT DROPDOWN TO BUTTON LIST....LIST + CHECK TO MAKE SURE THIS CONVERSION IS ONLY PERFORMED ONCE WHEN PAGE IS FIRST VISITED.
		//CONTEXT SELECTOR FOR PREVENTING BUTTONS FROM RENDERING MORE THAN  ONCE DISABLED TEMPORARILY WHILE CORRECTING A BUG IN PLUGIN.
		/*if($('.pageBind', $context).data('selectConvertToButtons')){
			app.u.dump("content exists, do nothing");
			} //do nothing, content already added.
		else{
			$('.pageBind', $context).data('selectConvertToButtons',true).append("");
			app.u.dump( "content doesn't exist, adding content");*/
			$('select[name=A0]').select2Buttons();
			$('select[name=A2]').select2Buttons();
			
			//END LIST
			$('label[title=Size]').next().addClass("shoeSize");
			$('input[name=A1]').parent().addClass("customInstruct");
			$('select[name=A2]').parent().addClass("addBeads");
			
			$("input[name=A1]").addClass("CustomInstructInput");
			
			
			$('.customInstruct').before(
				'<div data-bind="var:product(pid); format:assignAttribute; attribute:data-pid;">'
				+       '<a class="customInst customInstYes" onClick="app.ext.store_itasca.a.customInstructionsYes()">Yes</a>'
				+		'<a class="customInst customInstNo" onClick="app.ext.store_itasca.a.customInstructionsNo()">No</a>'
				+		'</div>'
			);
		//}
		
		
	//Image selector carousel
	
	
	var carousel1;
	function foo1(){ $(".thumbImages").carouFredSel({
		width   : 100,
		height	: 300,
    	items   : 3,
		scroll: 1,
		direction : "up",
		auto : false,
		prev : ".caroPrev1",
		next : ".caroNext1"
	});}
	carousel1 = foo1;
	setTimeout(carousel1, 2000);
		
	
	}]);



app.rq.push(['templateFunction','productTemplate','onDeparts',function(P) {
	$(".customInst").remove();
	$(".select2Buttons").remove();
	$(".customInstruct").hide();
	}]);
	

//**BEGIN TITLE APPENDING FUNCTIONALITY**//
				app.rq.push(['templateFunction', 'categoryTemplate','onCompletes',function(P){
					//var title = app.data["appPageGet|"+P.navcat]['%page'].page_title;
					var title = "Category Selection Page";
					app.ext.store_itasca.u.setTitle(title);
					
					//INTERNET EXPLORER WARNING MESSAGE
					if($('.headerIE8WarningCont').data('messageShown')){
					}
					else{
						$('.headerIE8WarningCont').data('messageShown',false);
					}
					if($('.headerIE8WarningCont').data('messageShown') === false)
					{
						$('.headerIE8WarningCont').anymessage({'message':'Due to Microsoft\'s decision to discontinue support of Windows XP, any users viewing this site in Internet Explorer on Windows XP will recieve a certificate warning at checkout. If you are viewing this site on Windows XP, please use a more modern browser like firefox, Chrome, Safari or Opera in order to complete your purchase and prevent any unintended issues.','persistent':true});	
						$('.headerIE8WarningCont').data('messageShown',true).append();
					}
					}]);
					
				app.rq.push(['templateFunction', 'productTemplate','onCompletes',function(P){
					//var title = app.data["appProductGet|"+infoObj.pid]['%attribs']['zoovy:prod_name'];
					var title = "Product Details Page";
					app.ext.store_itasca.u.setTitle(title);
					//INTERNET EXPLORER WARNING MESSAGE
					if($('.headerIE8WarningCont').data('messageShown')){
					}
					else{
						$('.headerIE8WarningCont').data('messageShown',false);
					}
					if($('.headerIE8WarningCont').data('messageShown') === false)
					{
						$('.headerIE8WarningCont').anymessage({'message':'Due to Microsoft\'s decision to discontinue support of Windows XP, any users viewing this site in Internet Explorer on Windows XP will recieve a certificate warning at checkout. If you are viewing this site on Windows XP, please use a more modern browser like firefox, Chrome, Safari or Opera in order to complete your purchase and prevent any unintended issues.','persistent':true});	
						$('.headerIE8WarningCont').data('messageShown',true).append();
					}
					}]);
					
				app.rq.push(['templateFunction', 'companyTemplate','onCompletes',function(P){
					var title = "Itasca Moccasins Company Information";
					app.ext.store_itasca.u.setTitle(title);
					//INTERNET EXPLORER WARNING MESSAGE
					if($('.headerIE8WarningCont').data('messageShown')){
					}
					else{
						$('.headerIE8WarningCont').data('messageShown',false);
					}
					if($('.headerIE8WarningCont').data('messageShown') === false)
					{
						$('.headerIE8WarningCont').anymessage({'message':'Due to Microsoft\'s decision to discontinue support of Windows XP, any users viewing this site in Internet Explorer on Windows XP will recieve a certificate warning at checkout. If you are viewing this site on Windows XP, please use a more modern browser like firefox, Chrome, Safari or Opera in order to complete your purchase and prevent any unintended issues.','persistent':true});	
						$('.headerIE8WarningCont').data('messageShown',true).append();
					}
					}]);
					
				app.rq.push(['templateFunction', 'customerTemplate','onCompletes',function(P){
					var title = "Itasca Moccasins Customer Information";
					app.ext.store_itasca.u.setTitle(title);
					//INTERNET EXPLORER WARNING MESSAGE
					if($('.headerIE8WarningCont').data('messageShown')){
					}
					else{
						$('.headerIE8WarningCont').data('messageShown',false);
					}
					if($('.headerIE8WarningCont').data('messageShown') === false)
					{
						$('.headerIE8WarningCont').anymessage({'message':'Due to Microsoft\'s decision to discontinue support of Windows XP, any users viewing this site in Internet Explorer on Windows XP will recieve a certificate warning at checkout. If you are viewing this site on Windows XP, please use a more modern browser like firefox, Chrome, Safari or Opera in order to complete your purchase and prevent any unintended issues.','persistent':true});	
						$('.headerIE8WarningCont').data('messageShown',true).append();
					}
					}]);
					
				app.rq.push(['templateFunction', 'homepageTemplate','onCompletes',function(P){
					var title = "Home";
					app.ext.store_itasca.u.setTitle(title);
					//INTERNET EXPLORER WARNING MESSAGE
					if($('.headerIE8WarningCont').data('messageShown')){
					}
					else{
						$('.headerIE8WarningCont').data('messageShown',false);
					}
					if($('.headerIE8WarningCont').data('messageShown') === false)
					{
						$('.headerIE8WarningCont').anymessage({'message':'Due to Microsoft\'s decision to discontinue support of Windows XP, any users viewing this site in Internet Explorer on Windows XP will recieve a certificate warning at checkout. If you are viewing this site on Windows XP, please use a more modern browser like firefox, Chrome, Safari or Opera in order to complete your purchase and prevent any unintended issues.','persistent':true});	
						$('.headerIE8WarningCont').data('messageShown',true).append();
					}
					}]);
					
				app.rq.push(['templateFunction', 'pageNotFoundTemplate','onCompletes',function(P){
					var title = "";
					app.ext.store_itasca.u.setTitle(title);
					//INTERNET EXPLORER WARNING MESSAGE
					if($('.headerIE8WarningCont').data('messageShown')){
					}
					else{
						$('.headerIE8WarningCont').data('messageShown',false);
					}
					if($('.headerIE8WarningCont').data('messageShown') === false)
					{
						$('.headerIE8WarningCont').anymessage({'message':'Due to Microsoft\'s decision to discontinue support of Windows XP, any users viewing this site in Internet Explorer on Windows XP will recieve a certificate warning at checkout. If you are viewing this site on Windows XP, please use a more modern browser like firefox, Chrome, Safari or Opera in order to complete your purchase and prevent any unintended issues.','persistent':true});	
						$('.headerIE8WarningCont').data('messageShown',true).append();
					}
					}]);
					
				app.rq.push(['templateFunction', 'checkoutTemplate','onCompletes',function(P){
					var title = "Checkout";
					app.ext.store_itasca.u.setTitle(title);
					//INTERNET EXPLORER WARNING MESSAGE
					if($('.headerIE8WarningCont').data('messageShown')){
					}
					else{
						$('.headerIE8WarningCont').data('messageShown',false);
					}
					if($('.headerIE8WarningCont').data('messageShown') === false)
					{
						$('.headerIE8WarningCont').anymessage({'message':'Due to Microsoft\'s decision to discontinue support of Windows XP, any users viewing this site in Internet Explorer on Windows XP will recieve a certificate warning at checkout. If you are viewing this site on Windows XP, please use a more modern browser like firefox, Chrome, Safari or Opera in order to complete your purchase and prevent any unintended issues.','persistent':true});	
						$('.headerIE8WarningCont').data('messageShown',true).append();
					}
					}]);
					
				app.rq.push(['templateFunction', 'searchTemplate','onCompletes',function(P){
					var title = "Search Results Page";
					app.ext.store_itasca.u.setTitle(title);
					//INTERNET EXPLORER WARNING MESSAGE
					if($('.headerIE8WarningCont').data('messageShown')){
					}
					else{
						$('.headerIE8WarningCont').data('messageShown',false);
					}
					if($('.headerIE8WarningCont').data('messageShown') === false)
					{
						$('.headerIE8WarningCont').anymessage({'message':'Due to Microsoft\'s decision to discontinue support of Windows XP, any users viewing this site in Internet Explorer on Windows XP will recieve a certificate warning at checkout. If you are viewing this site on Windows XP, please use a more modern browser like firefox, Chrome, Safari or Opera in order to complete your purchase and prevent any unintended issues.','persistent':true});	
						$('.headerIE8WarningCont').data('messageShown',true).append();
					}
					}]);
					
//**END TITLE APPENDING FUNCTIONALITY**//

var showDropdown = function ($tag) {
	var $dropdown = $(".dropdown", $tag);
	var height = 175;
	/*$dropdown.children().each(function(){
		height += $(this).outerHeight(true);
	});*/
	$dropdown.stop().animate({"height":height+"px"}, 0);
}
var hideDropdown = function ($tag) {
	$(".dropdown", $tag).stop().animate({"height":"0px"}, 100);
}
var showDropdownSubcat = function ($tag) {
	var $dropdown = $(".subcatDropdown", $tag);
	var height = 175;
	$(".dropdown").css("width","210px");
	/*$dropdown.children().each(function(){
		height += $(this).outerHeight(true);
	});*/
	$dropdown.stop().animate({"height":height+"px"}, 0);
}
var hideDropdownSubcat = function ($tag) {
	$(".dropdown").css("width","115px");
	$(".subcatDropdown", $tag).stop().animate({"height":"0px"}, 100);
}






//sample of an onDeparts. executed any time a user leaves this page/template type.
app.rq.push(['templateFunction','homepageTemplate','onDeparts',function(P) {app.u.dump("just left the homepage")}]);






//group any third party files together (regardless of pass) to make troubleshooting easier.
app.rq.push(['script',0,(document.location.protocol == 'https:' ? 'https:' : 'http:')+'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js']);
app.rq.push(['script',0,app.vars.baseURL+'jquery.cycle.all.js']);


/*
This function is overwritten once the controller is instantiated. 
Having a placeholder allows us to always reference the same messaging function, but not impede load time with a bulky error function.
*/
app.u.throwMessage = function(m)	{
	alert(m); 
	}

app.u.howManyPassZeroResourcesAreLoaded = function(debug)	{
	var L = app.vars.rq.length;
	var r = 0; //what is returned. total # of scripts that have finished loading.
	for(var i = 0; i < L; i++)	{
		if(app.vars.rq[i][app.vars.rq[i].length - 1] === true)	{
			r++;
			}
		if(debug)	{app.u.dump(" -> "+i+": "+app.vars.rq[i][2]+": "+app.vars.rq[i][app.vars.rq[i].length -1]);}
		}
	return r;
	}


//gets executed once controller.js is loaded.
//check dependencies and make sure all other .js files are done, then init controller.
//function will get re-executed if not all the scripts in app.vars.scripts pass 1 are done loading.
//the 'attempts' var is incremented each time the function is executed.

app.u.initMVC = function(attempts){
//	app.u.dump("app.u.initMVC activated ["+attempts+"]");
	var includesAreDone = true,
	percentPerInclude = (100 / app.vars.rq.length),   //what percentage of completion a single include represents (if 10 includes, each is 10%).
	resourcesLoaded = app.u.howManyPassZeroResourcesAreLoaded(),
	percentComplete = Math.round(resourcesLoaded * percentPerInclude); //used to sum how many includes have successfully loaded.

//make sure precentage is never over 100
	if(percentComplete > 100 )	{
		percentComplete = 100;
		}

	$('#appPreViewProgressBar','#appPreView').val(percentComplete);
	$('#appPreViewProgressText','#appPreView').empty().append(percentComplete+"% Complete");

	if(resourcesLoaded == app.vars.rq.length)	{
		var clickToLoad = false;
		if(clickToLoad){
			$('#loader').fadeOut(1000);
			$('#clickToLoad').delay(1000).fadeIn(1000).click(function() {
				app.u.loadApp();
			});
		} else {
			app.u.loadApp();
			}
		}
	else if(attempts > 100)	{
		app.u.dump("WARNING! something went wrong in init.js");
		//this is 10 seconds of trying. something isn't going well.
		$('#appPreView').empty().append("<h2>Uh Oh. Something seems to have gone wrong. </h2><p>Several attempts were made to load the store but some necessary files were not found or could not load. We apologize for the inconvenience. Please try 'refresh' and see if that helps.<br><b>If the error persists, please contact the site administrator</b><br> - dev: see console.</p>");
		app.u.howManyPassZeroResourcesAreLoaded(true);
		}
	else	{
		setTimeout("app.u.initMVC("+(attempts+1)+")",250);
		}

	}

app.u.loadApp = function() {
//instantiate controller. handles all logic and communication between model and view.
//passing in app will extend app so all previously declared functions will exist in addition to all the built in functions.
//tmp is a throw away variable. app is what should be used as is referenced within the mvc.
	app.vars.rq = null; //to get here, all these resources have been loaded. nuke record to keep DOM clean and avoid any duplication.
	var tmp = new zController(app);
//instantiate wiki parser.
	myCreole = new Parse.Simple.Creole();
	}


//Any code that needs to be executed after the app init has occured can go here.
//will pass in the page info object. (pageType, templateID, pid/navcat/show and more)



app.rq.push(['templateFunction','homepageTemplate','onCompletes',function(P) {
	var $target=$('#wideSlideshow');
	$target.cycle({fx:'fade',speed:'slow',timeout:5000,pager:'#slideshowNav',pagerAnchorBuilder:function(index,el){return'<a href="#"> </a>';},slideExpr:'li'});	
	}]);

//applying accordion widget to hardcoded FAQ (hardcoded because client doesn't have CRM)
app.rq.push(['templateFunction','companyTemplate','onCompletes',function(P) {
	$("#faqContentHardcode").accordion({ heightStyle: "content" });
}]);


//don't execute script till both jquery AND the dom are ready.
$(document).ready(function(){
	app.u.handleRQ(0)
	});






