var fs = require("fs");

fs.readFile("./package.json", "utf8", function(err, data) {
  if (err) {
    throw err;
  }
  console.log(data);
});

fs.writeFile("message.txt", "Hello", err => {
  if (err) throw err;
  console.log("The file has been saved!");
});
