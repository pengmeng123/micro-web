import { defineComponent, onMounted, ref } from "vue";
import Header from ".//header";
import CustomerTab from "./customer-tab";
import ContractTab from "./contract-tab";
import styles from "./index.module.less";
import { customerDetail } from "@/service";
import Cookies from "js-cookie";

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
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const activeKey = ref(TAB_OPTIONS[0].key);
    const comMapper = ref({
      customer: (record) => <CustomerTab record={record} />,
      contract: (record) => <ContractTab record={record} />,
    });
    const record = ref({});
    const loading = ref(true);

    onMounted(() => {
      if (window.microApp) {
        const data = window.microApp.getData();
        console.log("微前端全局数据:", data);

        // 设置 Cookie，确保能在代理请求中传递
        const token = data?.token || "d4fd6d8159594264bf71bb8c663ce045";
        Cookies.set("CRMSESSID", token);

        if (data?.customerId) {
          fetchCustomerDetail(data.customerId);
        } else {
          fetchCustomerDetail(1142433);
        }
      } else {
        // 单独访问时，使用硬编码的 token（仅用于测试）
        const token = "d4fd6d8159594264bf71bb8c663ce045";
        Cookies.set("CRMSESSID", token);
        fetchCustomerDetail(1142433);
      }
    });

    const fetchCustomerDetail = (customerId) => {
      loading.value = true;
      customerDetail(customerId)
        .then((res) => {
          record.value = res.data;
        })
        .finally(() => {
          loading.value = false;
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
      loading,
    };
  },
  render() {
    const { comMapper, activeKey, record } = this;
    if (this.loading) {
      return (
        <div style={{ padding: "20px 15px 15px" }}>
          <a-skeleton />
          <a-skeleton />
          <a-skeleton />
          <a-skeleton />
          <a-skeleton />
        </div>
      );
    }
    return (
      <div>
        <div class={styles.fixedHeader}>
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
          <a-alert message="这是vue3+vite_child子应用的客户详情页" banner />
          <Header record={record} />
        </div>
        <div>{comMapper[activeKey](record)}</div>
      </div>
    );
  },
});
