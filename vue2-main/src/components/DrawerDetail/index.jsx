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
    const { params } = this;
    return (
      <a-drawer
        width={800}
        title={params.title}
        placement="right"
        visible={this.visible}
        onClose={this.onClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-drawer>
    );
  },
};
