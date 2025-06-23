import { defineComponent, onMounted, ref } from "vue";
import Header from ".//header";
import CustomerTab from "./customer-tab";
import ContractTab from "./contract-tab";
import styles from "./index.module.less";

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
    const comMapper = ref({
      customer: () => <CustomerTab />,
      contract: () => <ContractTab />,
    });
    onMounted(() => {
      if (window.microApp) {
        const data = window.microApp.getData();
        console.log("f[[===1", data);
      }
    });

    const handleChange = (key) => {
      activeKey.value = key;
    };

    return {
      activeKey,
      handleChange,
      comMapper,
    };
  },
  render() {
    const { comMapper, activeKey } = this;
    return (
      <div>
        <div>
          <div class={styles.tabs}>
            <a-tabs
              size={"large"}
              activeKey={activeKey}
              onChange={this.handleChange}
            >
              {TAB_OPTIONS.map((v) => (
                <a-tab-pane key={v.key} tab={v.label}></a-tab-pane>
              ))}
            </a-tabs>
          </div>
          <Header />
        </div>
        <div>{comMapper[activeKey]()}</div>
      </div>
    );
  },
});
