var socket = io();

var chatApp = {
	
};

var mesageModel = Backbone.Model.extend({
	defaults: {
		author: '',
		time: ''
	},
	initialaze: function() {

	}
});

var messageCollection = Backbone.Collection.extend({
	model: mesageModel,
	initialize: function() {

	}
});

$('#sendMessage').on('click', function() {
	socket.emit('chatMessage', $('#message').val());
    $('#message').val('');
    return false;
});

socket.on('chatMessage', function(msg){
	$('#messageBox').append($('<div class="message">').text(msg));
});