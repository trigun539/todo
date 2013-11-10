/**
 * Router Controller
 */

define([ 
	'jquery', 
	'underscore', 
	'backbone', 
	'backbone.wreqr', 
	'marionette'
	], 
	function ( $, _, Backbone ) {

	var Controller = {
		home: function(){
			app.vent.trigger('home');
		}
	};

	return Controller; 
});