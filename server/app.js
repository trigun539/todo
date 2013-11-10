/*
	Main application file.
	Created by: Edwin Perez
 */

var express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
	mongoose = require('mongoose'),
	async = require('async'),
	MemoryStore = require('connect').session.MemoryStore,
	underscore = require('underscore'),
	fs = require('fs');

// App configuration
app.configure(function(){
	app.set('trust proxy', true);  
	app.set('view engine', 'ejs'); 
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '../client'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({
		store: new MemoryStore(), 
		secret: "Best todo app ever"
	}));
	app.use(app.router);
	mongoose.connect('mongodb://localhost/todo');
});

/**
 * Models
 */

var Schema = mongoose.Schema;

var todoSchema = new Schema({
  text:  String,
  completed:  Boolean
});

var Todo = mongoose.model('Todo', todoSchema); 

/**
 * Controllers
 */

app.get('/', function(req, res){
	res.render('index.ejs');
});

// API

// GET /api/todos
app.get('/api/todos', function(req, res){
	Todo.find({}, function(err, docs){
		res.send(docs);
	});
});

// GET /api/todos/:id
app.get('/api/todos/:id', function(req, res){
	var id = req.params.id || null;
	res.send(todos[parseInt(id)]);
});

// POST /api/todos
app.post('/api/todos', function(req, res){
	var todo = req.body || {};
	var newTodo = new Todo({
		text: todo.text,
		completed: todo.completed
	});	

	newTodo.save(function(err){
		if(err){
			console.log(err);
			res.send(500);
		}else{
			res.send(200, this.emitted.complete[0]);
		}
	});
});

// PUT /api/todos/:id
app.put('/api/todos/:id', function(req, res){
	var id = req.params.id || null;
	var todo = req.body || {};

	Todo.findOne({_id: id}, function(err, doc){
		doc.update({
			text: todo.text,
			completed: todo.completed
		}, function(err){
			if(err){
				console.log(err);
			}else{
				console.log(this);
				res.send(200);
			}
		});
	});
});

// DEL /api/todos/:id
app.del('/api/todos/:id', function(req, res){
	var id = req.params.id || null;
	
	Todo.remove({_id: id}, function(err){
		if(err){
			console.log(err);
		}else{
			res.send(200);
		}
	});
});

// Launching App.
app.listen(3003);	

console.log('Application started on port: 3003');