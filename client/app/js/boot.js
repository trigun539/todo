/**
 * Boot file for requireJS
 */

require.config({

	// Bust caching
	urlArgs: "bust=" +  (new Date()).getTime(),

    paths: {
    	app: '/js/app',
    	templates: '/templates/',
        jquery: '/js/components/jquery/jquery',
    	async: '/js/components/async/lib/async',
    	underscore: '/js/components/underscore/underscore',
    	backbone: '/js/components/backbone/backbone',
    	'backbone.wreqr': '/js/components/backbone.wreqr/lib/backbone.wreqr',
    	marionette: '/js/components/marionette/lib/core/backbone.marionette',
    	bootstrap: '/js/components/bootstrap/dist/js/bootstrap',
        handlebars: '/js/components/handlebars/handlebars',
    	text: '/js/components/requirejs-text/text',
    },
    shim: {
    	jquery: {
    		exports: 'jQuery'
    	},
        async: {
            exports: 'async'
        },
    	underscore: {
    		exports: '_'
    	},
    	backbone: {
    		deps: ['jquery', 'underscore'],
    		exports: 'Backbone'
    	},
    	'backbone.wreqr': {
    		deps: ['backbone']
    	},
    	marionette: {
    		deps: ['backbone', 'backbone.wreqr'],
    		exports: 'Marionette'
    	},
    	bootstrap: {
    		deps: ['jquery']
    	},
    	handlebars: {
    		exports: 'Handlebars'
    	}
    }
});

// Loading the application
require(['app'], function ( App ) {
	App.initialize();
});