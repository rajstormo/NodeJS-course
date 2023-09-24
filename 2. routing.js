const http = require('http');
const routes = require("./routes");

const server = http.createServer(routes);

// listen to incoming requests on port 3000
server.listen(3000, () => {
  console.log("listening")
})
