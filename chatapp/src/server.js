const http = require("./app");
const port = 3000;
http.listen(3000, () => {
  console.log(`app is running on port ${port}`);
});
