/**
 * WebSocket 服务
 */
const isDev = import.meta.env.VITE_APP_DEV === "dev";

const socketService = {
  socket: null,
  init(option) {
    if (typeof WebSocket === "undefined") {
      alert("您的浏览器不支持socket");
    } else {
      let path = `${import.meta.env.VITE_APP_BASE_WS_URL}/auctionWs${option.username}`;
      this.socket = new WebSocket(path);
      this.socket.onopen = this.open.bind(this);
      this.socket.onerror = this.error.bind(this);
      this.socket.onmessage = (e) => {
        option.onMessage(e.data);
      };
    }
  },
  open() {
    if (isDev) console.log("socket连接成功");
  },
  error() {
    console.error("socket连接错误");
  },
  send(params) {
    if (this.socket) {
      this.socket.send(params);
    }
  },
  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  },
};

export default socketService;
