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
  },

  methods: {
    onClose() {
      this.visible = false;
    },
  },

  render() {
    const { microName, microUrl, ...restParams } = this.params;
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
          iframe
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
