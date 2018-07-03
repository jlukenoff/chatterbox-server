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
    roomname: 'lobby',
    objectId: 0
  },
  {
    username: 'John',
    text: 'It\'s good to be the king',
    roomname: 'classroom2',
    objectId: 1
  },
  {
    username: 'Deepali',
    text: 'It\'s good to be the king',
    roomname: 'lobby',
    objectId: 2
  },
  {
    username: 'Sam',
    text: 'It\'s good to be the king',
    roomname: 'classroom1',
    objectId: 3
  }
];

var id = 3;




var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';
  var statusCode = 200;

  if (!request.url.startsWith('/classes/messages')) {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: messages}));
  } else if (request.method === 'POST') {
    statusCode = 201;
    let data = '';
    id++;
    request.on('data', function(message) {
      data += message;
      let newMessage = JSON.parse(data);
      newMessage.objectId = id;
      messages.splice(0, 0, newMessage);
    });
    request.on('end', function () {
      // debugger;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results: messages}));
    });
    // messages.push(request.data);
  } else {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: messages}));
  }

  

  
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

