/**
 * Header View
 */

define([ 
	'jquery', 
	'underscore', 
	'backbone', 
	'text!templates/header.html',
	'backbone.wreqr', 
	'marionette', 
	'bootstrap',
	'handlebars'
], 

function ( $, _, Backbone, Template ) {

	var View = Backbone.Marionette.ItemView.extend({

		tagName: 'header',

		className: 'navbar navbar-default navbar-fixed-top',

		template: Handlebars.compile(Template),

		initialize: function(){
			
		}
	});

	return View;
});