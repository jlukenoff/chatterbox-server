/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var messages = [
  {
    username: 'Mel Brooks',
    text: 'It\'s good to be the king',
    roomname: 'lobby'
  },
  {
    username: 'John',
    text: 'It\'s good to be the king',
    roomname: 'classroom2'
  },
  {
    username: 'Deepali',
    text: 'It\'s good to be the king',
    roomname: 'lobby'
  },
  {
    username: 'Sam',
    text: 'It\'s good to be the king',
    roomname: 'classroom1'
  }
];

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';
  var statusCode = 200;
  //check if endpoint is valid
  if (!request.url.startsWith('/classes/messages')) {
  
    statusCode = 404;
  }

  response.writeHead(statusCode, headers);

  response.end(JSON.stringify({results: messages}));
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


exports.requestHandler = requestHandler;

