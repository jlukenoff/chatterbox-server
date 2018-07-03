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
    objectId: 3
  },
  {
    username: 'John',
    text: 'It\'s good to be the king',
    roomname: 'classroom2',
    objectId: 2
  },
  {
    username: 'Deepali',
    text: 'It\'s good to be the king',
    roomname: 'lobby',
    objectId: 1
  },
  {
    username: 'Sam',
    text: 'It\'s good to be the king',
    roomname: 'classroom1',
    objectId: 0
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
      if (Object.keys(newMessage).length < 3) {
        statusCode = 404;
      }
      newMessage.objectId = id;
      messages.splice(0, 0, newMessage);
    });
    request.on('end', function () {
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results: messages}));
    });
    // messages.push(request.data);
  } else {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: messages}));
  }
};

exports.requestHandler = requestHandler;

