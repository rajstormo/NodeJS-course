const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  res.setHeader('Content-Type', "text/html");

  // if url entered is '/' , load a form and on submitting it go to /message page
  switch (url) {
    case '/':
      res.write('<html>');
      res.write('<body> <form method="POST" action="/message"> <input type="text" placeholder="enter something..." name="message" /> </form> </body');
      res.write('</html>');
      return res.end();

    // on visiting this route, it is creating a file with dummy value
    case "/message":
      const formData = [];
      req.on('data', (chunkData) => {
        formData.push(chunkData);
      })
      return req.on('end', () => {
        const result = formData.toString().split('=')[1];
        // blocking code -> synchronous 
        // fs.writeFileSync("myFile.txt", result);

        // non-block code => asynchronous
        fs.writeFile("myFile.txt", result, (err) => {
          if (!err) {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end("done");
          }
        })
      })
  }
}

module.exports = requestHandler;