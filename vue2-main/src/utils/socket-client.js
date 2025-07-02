import jsCookie from "js-cookie";
import { get, debounce } from "lodash";
import { notification } from "ant-design-vue";

const isProd = process.env.NODE_ENV === "production";
const socketUrl = isProd
  ? "https://imess.qcc.com/"
  : "http://nodejs-app-online-message.sit.office.greatld.com/";
class socketClient {
  alreadyCount = 0;
  constructor(context) {
    this.user = context.$store.state.profile || {};
    this.deviceId = this.user?.guid || jsCookie.get("qcc_did");
    this.socketConnected = false;
    this.store = context.$store;
    this.debouncedFetchMessageData = debounce(
      this.fetchMessageData.bind(this),
      200
    );
  }

  getIdentity() {
    const uid = this.user.guid;
    return { uid, sid: this.deviceId, type: 1, system: "kzz-web" };
  }

  start() {
    if (typeof WebSocket === "undefined" || !this.deviceId) return;
    setTimeout(() => {
      !this.socketConnected && this.makeSocket();
    }, parseInt(Math.random(0, 1) * 1000)); // 随机延迟时间，防止当一个tab关掉后，其他tab同时触发
  }

  makeSocket() {
    console.log("makeSocket------");
    const socket = window?.imessIO(socketUrl, {
      reconnection: true,
      reconnectionAttempts: 1,
      autoConnect: true,
      transports: ["websocket"],
      auth: this.getIdentity(),
    });
    if (!socket) {
      return;
    }
    socket.on("connect", () => {
      console.log("connect------");
      this.socketConnected = true;
    });
    socket.on("message", (data) => {
      if (document.hidden) {
        // 页面被挂起
        return;
      }
      this.debouncedFetchMessageData(data);
    });
    socket.on("disconnect", () => {
      this.socketConnected = false;
    });
    socket.on("connect_error", (err) => {
      if (err.message === "already connect") {
        this.socketConnected = false;
        this.alreadyCount++;
        if (this.alreadyCount > 2) {
          // 避免一直重试
          //   clearInterval(this.scanInterval);
        }
      }
    });
  }

  fetchMessageData(data) {
    console.log("收到消息", data);

    if (get(data, "[0].data.tipType") === 1) {
      const type = get(data, "[0].data.type");
      if (type === 20) {
        notification.open({
          message: "系统消息",
          description: "收到一条评论的点赞",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
      }
      if (type === 19) {
        notification.open({
          message: "系统消息",
          description: "您收到一条评论",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
        this.store.dispatch("fetchMessageNum");
      }
    }
  }
}
export default socketClient;
