/**
 * Home View
 */

define([ 
	'jquery', 
	'underscore', 
	'backbone', 
	'models/Todo', 
	'collections/todos', 
	'text!templates/home.html',
	'backbone.wreqr', 
	'marionette', 
	'bootstrap',
	'handlebars'
], 

function ( $, _, Backbone, TodoModel, TodoCollection, Template ) {

	var View = Backbone.Marionette.ItemView.extend({

		tagName: 'div',

		className: 'container',

		template: Handlebars.compile(Template),

		ui: {
			list: '#todoList',
			newTodoText: '#newTodo',
			addTodo: '#addTodo'
		},

		events: {
			'click #addTodo': 'addTodo',
			'keypress #newTodo': 'submitForm',
			'click #clear': 'removeDone',
			'click #sort': 'sort'
		},

		initialize: function(){
			var view = this;

			view.itemViewOptions = {};
			view.itemViewOptions.todoCollection = new TodoCollection();
			view.itemViewOptions.todoCollection.fetch({reset: true});

			this.listenTo(view.itemViewOptions.todoCollection, 'reset', this.addAll, this);
			this.listenTo(view.itemViewOptions.todoCollection, 'add', this.addAll, this);
			this.listenTo(view.itemViewOptions.todoCollection, 'remove', this.addAll, this);

		},

		onRender: function(){
			var view = this;
			// Adding event for Todo complete
			view.ui.list.delegate( ".list-group-item", "click", function() {
			  var model = view.itemViewOptions.todoCollection.get($(this).attr('id'));
			  if(!model.get('completed')){
			  	$( this ).append('<i class="fa fa-check pull-right" style="color: green;"></i>');
			  	model.set('completed', true);
			  	model.save();
			  }
			});
		},

		addAll: function(){
			var view = this;
			var listHTML = '';

			_.each(view.itemViewOptions.todoCollection.models, function(model){
				var itemHTML = '<a id="'+model.attributes._id+'" href="#" class="list-group-item">';
				if(model.attributes.completed){
					itemHTML += '<i class="fa fa-check pull-right" style="color: green;"></i>';
				}
				itemHTML += model.attributes.text+'</a>';

	  			listHTML += itemHTML;				
			});

			view.ui.list.html(listHTML);
		},

		addTodo: function(){
			var view = this;
			var todo = new TodoModel({
				text: view.ui.newTodoText.val()
			});

			view.itemViewOptions.todoCollection.create(todo);

			view.ui.newTodoText.val('');
		},

		submitForm: function(e){
			if(e.keyCode == 13 ){
				this.addTodo();
			}
		},

		sort: function(){
			var view = this;
			view.addAll();
		},

		removeDone: function(){
			var view = this;

			for(var i = view.itemViewOptions.todoCollection.models.length - 1; i >=0; i--){
				if(view.itemViewOptions.todoCollection.models[i].get('completed')){
					view.itemViewOptions.todoCollection.models[i].destroy();
				}
			}
		}

	});

	return View;
});