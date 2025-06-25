import microApp from "@micro-zoe/micro-app";
import { logout } from "@/utils";

export default {
  name: "DrawerDetail",
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: false,
    };
  },

  mounted() {
    this.visible = true;
    this.bindMicroAppEvents();
  },

  beforeDestroy() {
    // 清理事件监听
    this.unbindMicroAppEvents();
  },

  methods: {
    onClose() {
      this.visible = false;
    },
    handleMicroAppData(data) {
      console.log("来自子应用my-app的数据", data);

      switch (data?.type) {
        case "jump-to-login": {
          logout();
          break;
        }
        case "dr:close-refresh": {
          this.onClose();
          this.params.refresh?.();
          break;
        }
      }
    },
    bindMicroAppEvents() {
      const { microName } = this.params;
      if (microName) {
        microApp.addDataListener(microName, this.handleMicroAppData);
      }
    },
    unbindMicroAppEvents() {
      const { microName } = this.params;
      if (microName) {
        microApp?.removeDataListener(microName, this.handleMicroAppData);
      }
    },
    handleDataChange(data) {
      console.log("handleDataChange", data);
    },
  },

  render() {
    const {
      microName,
      microUrl,
      width = 800,
      iframe = false,
      ...restParams
    } = this.params;
    return (
      <a-drawer
        width={width}
        placement="right"
        visible={this.visible}
        onClose={this.onClose}
        bodyStyle={{ padding: 0 }}
      >
        <micro-app
          clear-data
          name={microName}
          iframe={iframe}
          url={microUrl}
          data={{
            ...restParams,
            visible: this.visible,
          }}
          onDatachange={this.handleDataChange}
        ></micro-app>
      </a-drawer>
    );
  },
};
