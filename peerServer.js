const { PeerServer } = require("peer");
const peer = PeerServer({ port: 9000, path: "/" });
console.log("peer server is running on port 9000");
