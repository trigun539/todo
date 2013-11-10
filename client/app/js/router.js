/**
 * Router
 */

define([ 
	'jquery', 
	'underscore', 
	'backbone', 
	'backbone.wreqr', 
	'marionette'
	], 
	function ( $, _, Backbone ) {

	var Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			"": "home"
		},
	});

	return Router; 
});