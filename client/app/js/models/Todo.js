/**
 * Backbone Model
 */

define([ 
	'jquery', 
	'underscore', 
	'backbone', 
	'marionette'
], 

function ( $, _, Backbone ) {

	var Model = Backbone.Model.extend({
		defaults: {
		        text: '',
		        completed: false
		},
		idAttribute: "_id"
	});

	return Model;
});