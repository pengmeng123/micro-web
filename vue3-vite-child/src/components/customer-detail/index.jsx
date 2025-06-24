import { defineComponent, onMounted, ref } from "vue";
import Header from ".//header";
import CustomerTab from "./customer-tab";
import ContractTab from "./contract-tab";
import styles from "./index.module.less";
import { customerDetail } from "@/service";

const TAB_OPTIONS = [
  {
    label: "客户详情",
    key: "customer",
  },
  {
    label: "合同订单",
    key: "contract",
  },
];

export default defineComponent({
  setup() {
    const activeKey = ref(TAB_OPTIONS[0].key);
    const comMapper = ref({
      customer: (record) => <CustomerTab record={record} />,
      contract: (record) => <ContractTab record={record} />,
    });
    const record = ref({});

    onMounted(() => {
      if (window.microApp) {
        const data = window.microApp.getData();
        console.log("f[[===1", data);
        if (data?.customerId) {
          fetchCustomerDetail(data?.customerId);
        }
      } else {
        fetchCustomerDetail(1142433);
      }
    });

    const fetchCustomerDetail = (customerId) => {
      customerDetail(customerId).then((res) => {
        record.value = res.data;
      });
    };

    const handleChange = (key) => {
      activeKey.value = key;
    };

    return {
      activeKey,
      handleChange,
      comMapper,
      record,
    };
  },
  render() {
    const { comMapper, activeKey, record } = this;
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
          <Header record={record} />
        </div>
        <div>{comMapper[activeKey](record)}</div>
      </div>
    );
  },
});
