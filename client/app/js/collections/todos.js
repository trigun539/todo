/**
 * Todos Collection
 */

define([ 
	'jquery', 
	'underscore', 
	'backbone', 
	'models/Todo',
	'marionette'
], 

function ( $, _, Backbone, TodoModel ) {

	var Collection = Backbone.Collection.extend({
		// Reference to this collection's model.
        model: TodoModel,
		
		url: '/api/todos',

		// Todos are sorted by completed
        comparator: function (todo) {
                return todo.get('completed');
        }       
	});

	return Collection;
});