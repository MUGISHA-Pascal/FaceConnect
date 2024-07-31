const peer = new Peer(undefined, { host: "localhost", port: 9000, path: "/" });

const localvideo = document.getElementById("localvideo");
const remotevideo = document.getElementById("remotevideo");

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localvideo.srcObject = stream;
    peer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (remotestream) => {
        remotevideo.srcObject = remotestream;
      });
    });
    document.getElementById("connect_btn").addEventListener("click", () => {
      const remoteid = document.getElementById("peer_id").value;
      const call = peer.call(remoteid, stream);
      call.on("stream", (remotestream) => {
        remotevideo.srcObject = remotestream;
      });
    });
  });
peer.on("open", (id) => {
  document.getElementById("peer_id").value = id;
});
