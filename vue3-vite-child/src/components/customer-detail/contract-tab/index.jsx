import { defineComponent } from "vue";
import styles from "./index.module.less";

export default defineComponent({
  setup() {
    // 表格列定义
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "地址",
        dataIndex: "address",
        key: "address",
      },
    ];

    // 表格数据
    const data = [
      {
        key: "1",
        name: "张三",
        age: 32,
        address: "北京市朝阳区",
      },
      {
        key: "2",
        name: "李四",
        age: 28,
        address: "上海市浦东新区",
      },
      {
        key: "3",
        name: "王五",
        age: 25,
        address: "广州市天河区",
      },
    ];

    return { columns, data };
  },
  render() {
    return (
      <div class={styles.container}>
        <a-card
          bordered={false}
          title={"共14条"}
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
            size="small"
            columns={this.columns}
            dataSource={this.data}
            bordered
            pagination={{ pageSize: 10 }}
          />
        </a-card>
      </div>
    );
  },
});
