/**
 * Main application file front-end
 */

define([ 
	'jquery', 
	'underscore',
	'async', 
	'backbone', 
	'router',
	'views/header',
	'views/home',
	'controllers/routerCtr',
	'backbone.wreqr', 
	'marionette', 
	'bootstrap'
	], 
	function ( $, _, async, Backbone, Router, HeaderView, HomeView, RouterCtr ) {

	var _initilize = function(){
	
		app = new Backbone.Marionette.Application();

		app.addRegions({
		        header: '#header',
		        main: '#main'
		});

		app.addInitializer(function () {
			window.app.router = new Router({ controller: RouterCtr });	
			window.app.router.initialize();
	        Backbone.history.start();
		});

		// Vent events
		app.vent.on('home', function(){
			var headerView = new HeaderView();
			var homeView = new HomeView();
			app.header.show(headerView);
			app.main.show(homeView);
		});

		// Starting application
		app.start();

	}	

	return {
		initialize: _initilize
	}
});