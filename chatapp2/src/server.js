const server = require("./app");
const port = 3000;
server.listen(port, () => {
  console.log(`app is running on http://localhost:3000`);
});
