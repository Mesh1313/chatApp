var chatApp = {
	socket: null,
	messageFormView: null,
	messageCollection: null,
	messageBoxView: null,

	initialize: function() {
		var that = this;
		that.messageCollection = new messageCollection([]);
		that.messageBoxView = new messageBoxView({
			collection: that.messageCollection
		});

		that.messageBoxView.render();

		that.socket = io();
		that.messageFormView = new messageFormView(that.socket);

		that.socket.on('chatMessage', function(msgObject){
			that.messageBoxView.collection.add(new messageModel(msgObject));
		});
	}
};

var messageModel = Backbone.Model.extend({
	defaults: {
		message: '',
		sender: ''
	}
});

var messageCollection = Backbone.Collection.extend({
	model: messageModel
});

var messageView = Backbone.View.extend({
	tagName: 'div',
	template: _.template('<div class="userName"><%= model.get("sender").name %></div>' + '<div class="userMessage"><%= model.get("message") %></div>'),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({model: this.model}));

		if(this.model.get('sender').id === chatApp.socket.id) {
			this.$el.addClass('sender');
		}
	}
});

var messageBoxView = Backbone.View.extend({
	collection: null,
	el: '#messageBox',
	initialize: function(options) {
		this.collection = options.collection;

		this.collection.bind('add', _.bind(this.render, this));
	},
	render: function() {
		this.$el.html('');
		this.collection.forEach(function(message) {
			var messageViewInstance = new messageView({ model: message });

			this.$el.append(messageViewInstance.el);
		}, this);

		return this;
	}
});

var messageFormView = Backbone.View.extend({
	socketInstance: null,
	el: '#messageForm',
	events: {
		'click #sendMessage': 'sendMessage'
	},
	initialize: function(socketInstance) {
		this.socketInstance = socketInstance;
	},
	sendMessage: function(e) {
		var messageElem = $('#message');

		e.preventDefault();

		this.socketInstance.emit('chatMessage', messageElem.val());
		messageElem.val('');
		return false;
	}
});

chatApp.initialize();