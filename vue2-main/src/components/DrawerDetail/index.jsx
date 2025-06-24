import microApp from "@micro-zoe/micro-app";

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
      if (data?.type === "dr:close-refresh") {
        this.onClose();
        this.params.refresh?.();
      }
    },
    bindMicroAppEvents() {
      const { microName } = this.params;
      if (microName) {
        this.unbindMicroAppEvents();
        microApp.addDataListener(microName, this.handleMicroAppData);
      }
    },
    unbindMicroAppEvents() {
      const { microName } = this.params;
      if (microName) {
        microApp?.removeDataListener(microName, this.handleMicroAppData);
      }
    },
  },

  render() {
    const { microName, microUrl, iframe = false, ...restParams } = this.params;
    return (
      <a-drawer
        width={800}
        placement="right"
        visible={this.visible}
        onClose={this.onClose}
        bodyStyle={{ padding: 0 }}
      >
        <micro-app
          name={microName}
          iframe={iframe}
          url={microUrl}
          data={{
            ...restParams,
            visible: this.visible,
            token: "d4fd6d8159594264bf71bb8c663ce045",
          }}
        ></micro-app>
      </a-drawer>
    );
  },
};
