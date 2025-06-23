import { defineComponent, onMounted, ref } from "vue";

const TAB_OPTIONS = [
  {
    label: "客户详情",
    key: "customer",
  },
  {
    label: "合同详情",
    key: "contract",
  },
];

export default defineComponent({
  setup() {
    const activeKey = ref(TAB_OPTIONS[0].key);
    onMounted(() => {
      if (window.microApp) {
        const data = window.microApp.getData();
        console.log("f[[===", data);
      }
    });

    const handleChange = (key) => {
      activeKey.value = key;
    };

    return {
      activeKey,
      handleChange,
    };
  },
  render() {
    return (
      <div>
        <a-tabs
          size={"large"}
          activeKey={this.activeKey}
          onChange={this.handleChange}
        >
          {TAB_OPTIONS.map((v) => (
            <a-tab-pane key={v.key} tab={v.label}></a-tab-pane>
          ))}
        </a-tabs>
        <div>繁創電子科技（香港）有限公司</div>
        <div>{this.activeKey}</div>
      </div>
    );
  },
});
