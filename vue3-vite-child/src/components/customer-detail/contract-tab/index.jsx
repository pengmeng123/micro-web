import { defineComponent, onMounted, reactive, ref } from "vue";
import { customerContractSearch } from "@/service";
import styles from "./index.module.less";
import { textAreaProps } from "ant-design-vue/es/input/inputProps";

export default defineComponent({
  props: {
    record: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // 表格列定义
    const columns = [
      {
        title: "合同编号",
        customRender: ({ record }) => {
          return <a>{record?.code}</a>;
        },
      },
      {
        title: "合同名称",
        customRender: ({ record }) => {
          return <span>{record?.name}</span>;
        },
      },
      {
        title: "合同金额",
        customRender: ({ record }) => {
          return <span>¥{record?.amount || 0}</span>;
        },
      },
    ];

    const dataSource = ref([]);
    const customerId = ref(undefined);
    const loading = ref(false);

    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
    });

    onMounted(() => {
      console.log("contract-tab mounted");
      customerId.value = 5240688 || props.record.customerId;
      fetchcustomerContractSearch({
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
        customerIds: [customerId.value],
      });
    });

    const fetchcustomerContractSearch = (data) => {
      loading.value = true;
      return customerContractSearch(data)
        .then((res) => {
          dataSource.value = res.data;
          pagination.current = res.page?.current;
          pagination.total = res.page?.total;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const handleTableChange = (pagination, filters, sorter) => {
      fetchcustomerContractSearch({
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
        customerIds: [customerId.value],
      });
    };

    return { columns, pagination, dataSource, handleTableChange, loading };
  },
  render() {
    const { pagination, dataSource, handleTableChange } = this;
    return (
      <div class={styles.container}>
        <a-card
          bordered={false}
          title={`共${pagination.total || 0}条`}
          bodyStyle={{
            padding: "24px 15px",
            boxShadow: "none",
          }}
          headStyle={{
            padding: "0",
            margin: "0 15px",
          }}
        >
          <a-table
            rowKey="contractId"
            size="small"
            loading={this.loading}
            columns={this.columns}
            dataSource={dataSource}
            bordered
            pagination={pagination.total > 10 ? pagination : false}
            onChange={handleTableChange}
          />
        </a-card>
      </div>
    );
  },
});
