// require the 'http' module to create a server
const http = require('http');

// createServer() helps to create a server and takes 2 arguments i.e the request and the response object
const server = http.createServer((req,res) => {
  console.log(req.url, req.method, req.headers);

  // set the header Content-Type as text/html so that browser understand this is a html page
  res.setHeader('Content-Type',"text/html");

  // used to send 
  res.write('<html>');
  res.write('<body> <h1> Hello, World </h1> </body');
  res.write('</html>');

  // this basically means that now server will not send anything after this and marks this as the end of the response
  res.end();
});

// listen to incoming requests on port 3000
server.listen(3000, () => {
  console.log("listening")
})
