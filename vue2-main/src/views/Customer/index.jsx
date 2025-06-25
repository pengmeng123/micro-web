import { Table, Card, Badge } from "ant-design-vue";
import styles from "./index.module.less";
import { customerSearch } from "@/service";
import PageLoading from "@/components/Loading";
import { uniq, compact } from "lodash";
import { openDrawerDetail } from "@/hooks";
import { MICRO_MAPPER } from "@/config";

export default {
  name: "PageCustomer",

  data() {
    return {
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
      },
      dataSource: [],
    };
  },

  mounted() {
    this.fetchCustomers();
  },

  methods: {
    fetchCustomers() {
      this.loading = true;
      return customerSearch({
        pageIndex: this.pagination.current,
        pageSize: this.pagination.pageSize,
      })
        .then((res) => {
          this.dataSource = res?.data || [];
          this.pagination.total = res?.page?.total || 0;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleSearch() {
      this.pagination.current = 1;
      this.fetchCustomers();
    },

    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;

      this.fetchCustomers();
    },

    handleViewDetail(record) {
      this.$message.info(`查看客户详情: ${record.name}`);
      // 这里可以跳转到详情页或打开详情抽屉/模态框
      // 也可以与子应用交互，将客户信息传递给子应用

      // 示例：通过微前端通信将客户信息传递给子应用
      window.microApp?.dispatch({
        type: "viewCustomerDetail",
        data: record,
        url: "http://localhost:5003/customer-detail",
      });
    },
  },

  render() {
    const columns = [
      {
        title: "客户名称",
        width: 260,
        customRender: (text, record) => (
          <a
            onClick={() => {
              openDrawerDetail({
                title: "客户详情",
                iframe: true,
                customerId: record.customerId,
                microName: MICRO_MAPPER.VUE3_VITE_CHILD.name,
                microUrl: `${MICRO_MAPPER.VUE3_VITE_CHILD.host}/customer-detail`,
                refresh: () => {
                  this.fetchCustomers();
                },
              });
            }}
          >
            {record.name}
          </a>
        ),
      },
      {
        title: "所属地区",
        width: 165,
        customRender: (text, record) => {
          return (
            uniq(compact([record.province, record.city, record.district])).join(
              ""
            ) || "-"
          );
        },
      },

      {
        title: "负责人",
        width: 165,
        customRender: (text, record) => {
          const users = record.userCustomers?.filter((v) => v.roleId === 4);
          return users?.length > 0 ? (
            <a
              onClick={() => {
                openDrawerDetail({
                  title: "个人详情",
                  width: 400,
                  iframe: true,
                  userId: users[0].userId,
                  microName: MICRO_MAPPER.VUE3_VITE_CHILD.name,
                  microUrl: `${MICRO_MAPPER.VUE3_VITE_CHILD.host}/personal-detail`,
                });
              }}
            >
              {users[0].name}
            </a>
          ) : (
            "-"
          );
        },
      },

      {
        title: "地址",
        customRender: (text, record) => record.address || "-",
      },
    ];

    return (
      <div>
        <a-alert
          message="这是主应用的客户管理列表"
          banner
          style={{ marginBottom: "15px" }}
        />

        <div class={styles.container}>
          <Card bordered={false} class={styles.tableCard}>
            <div class={styles.tableHeader}>
              <div class={styles.tableTitle}>
                <Badge status="processing" text="客户列表" />
                <span class={styles.tableTotalText}>
                  共 {this.pagination.total} 条记录
                </span>
              </div>
            </div>

            {this.loading ? (
              <PageLoading />
            ) : (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={this.dataSource}
                pagination={this.pagination}
                onChange={this.handleTableChange}
              />
            )}
          </Card>
        </div>
      </div>
    );
  },
};
